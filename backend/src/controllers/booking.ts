import { Request, Response } from 'express';
import { pool } from '../config/db';
import { sendSMS } from '../services/sms';
import { assignDealer } from '../services/dealer';
import { sendNotification } from '../services/notification';

/**
 * Creates a new test drive booking request
 */
export async function createBooking(req: Request, res: Response) {
  const { name, phone, email, city, carId, preferredDate, preferredTimeSlot } = req.body;

  // Simple server-side validation
  if (!name || !phone || !city || !carId || !preferredDate || !preferredTimeSlot) {
    return res.status(400).json({ error: 'Missing required fields. Name, Phone, City, Car selection, Date, and Time Slot are required.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Verify that the selected car exists
    const carCheck = await client.query('SELECT name, brand FROM cars WHERE id = $1', [carId]);
    if (carCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Selected car model not found.' });
    }
    const car = carCheck.rows[0];

    // 2. Find or create user by phone number (phone is unique)
    let userId: number;
    const userQuery = await client.query('SELECT id FROM users WHERE phone = $1', [phone]);
    
    if (userQuery.rows.length > 0) {
      userId = userQuery.rows[0].id;
      // Update name/email if user provided them
      await client.query(
        'UPDATE users SET name = $1, email = COALESCE($2, email) WHERE id = $3',
        [name, email || null, userId]
      );
    } else {
      const newUserQuery = await client.query(
        'INSERT INTO users (name, phone, email) VALUES ($1, $2, $3) RETURNING id',
        [name, phone, email || null]
      );
      userId = newUserQuery.rows[0].id;
    }

    // 3. Create the booking record
    const bookingQuery = await client.query(
      `INSERT INTO bookings (user_id, car_id, city, preferred_date, preferred_time_slot)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, status`,
      [userId, carId, city, preferredDate, preferredTimeSlot]
    );
    const booking = bookingQuery.rows[0];

    await client.query('COMMIT');

    // --- Future-Ready Integrations (Trigger placeholders) ---
    // A. Assign a dealer
    const assignedDealer = await assignDealer(city, carId);

    // B. Send SMS confirmation to user
    const smsMessage = `Hi ${name}, your test drive request for the ${car.name} is booked on ${preferredDate} (${preferredTimeSlot}). ID: B-${booking.id}. Dealer: ${assignedDealer.name}.`;
    await sendSMS(phone, smsMessage);

    // C. Notify Admin and Dealer
    await sendNotification(
      'system',
      assignedDealer.email,
      `New Test Drive Booking: B-${booking.id}`,
      `Customer ${name} (${phone}) requested a test drive for ${car.brand} ${car.name} in ${city} for ${preferredDate} at ${preferredTimeSlot}.`
    );

    return res.status(201).json({
      bookingId: `B-${booking.id}`,
      carName: car.name,
      preferredDate: preferredDate,
      preferredTimeSlot: preferredTimeSlot,
      message: 'Your test drive request has been submitted. Dealer will contact you shortly.'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Failed to process booking. Please try again.' });
  } finally {
    client.release();
  }
}

/**
 * Gets all bookings for the Admin dashboard (joined with customer and car details)
 */
export async function getAllBookings(req: Request, res: Response) {
  try {
    const query = `
      SELECT 
        b.id,
        b.city,
        b.preferred_date::text as preferred_date,
        b.preferred_time_slot,
        b.status,
        b.created_at,
        u.name as customer_name,
        u.phone as customer_phone,
        u.email as customer_email,
        c.name as car_name,
        c.brand as car_brand
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN cars c ON b.car_id = c.id
      ORDER BY b.created_at DESC
    `;
    const result = await pool.query(query);
    
    // Map booking IDs to look nice (e.g. B-123)
    const bookings = result.rows.map(row => ({
      ...row,
      formatted_id: `B-${row.id}`
    }));

    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings list.' });
  }
}

/**
 * Updates status of a booking request (e.g. Pending, Confirmed, Completed, Cancelled)
 */
export async function updateBookingStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status value. Must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING id, status',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    return res.status(200).json({
      message: 'Booking status updated successfully.',
      booking: {
        bookingId: `B-${result.rows[0].id}`,
        status: result.rows[0].status
      }
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({ error: 'Failed to update booking status.' });
  }
}

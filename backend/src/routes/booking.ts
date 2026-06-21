import { Router } from 'express';
import { createBooking, getAllBookings, updateBookingStatus } from '../controllers/booking';

const router = Router();

// POST /api/bookings - Submit a new test drive booking request
router.post('/', createBooking);

// GET /api/bookings/admin - Admin view of all booking requests
router.get('/admin', getAllBookings);

// PATCH /api/bookings/admin/:id/status - Admin action to update a booking request status
router.patch('/admin/:id/status', updateBookingStatus);

export default router;

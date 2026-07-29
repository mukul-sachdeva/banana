import { Request, Response } from 'express';
import { pool } from '../config/db';

/**
 * Submits a new city expansion request
 */
export async function createCityRequest(req: Request, res: Response) {
  const { city, fullName, phone, email, interestedCars, purchaseTimeline, source } = req.body;

  if (!city || typeof city !== 'string' || !city.trim()) {
    return res.status(400).json({ error: 'City name is required.' });
  }

  const trimmedCity = city.trim();
  const formattedCity = trimmedCity.charAt(0).toUpperCase() + trimmedCity.slice(1);
  const carsArray = Array.isArray(interestedCars) ? interestedCars : [];
  const reqSource = source && typeof source === 'string' ? source : 'website';

  try {
    const query = `
      INSERT INTO city_requests (city, full_name, phone, email, interested_cars, purchase_timeline, source)
      VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7)
      RETURNING id, city, created_at
    `;
    const values = [
      formattedCity,
      fullName?.trim() || null,
      phone?.trim() || null,
      email?.trim() || null,
      JSON.stringify(carsArray),
      purchaseTimeline || null,
      reqSource
    ];

    const result = await pool.query(query, values);
    const newRecord = result.rows[0];

    return res.status(201).json({
      message: `Thank you for requesting Flowzap in ${formattedCity}!`,
      requestId: newRecord.id,
      city: newRecord.city,
      createdAt: newRecord.created_at
    });
  } catch (error) {
    console.error('Error creating city request:', error);
    return res.status(500).json({ error: 'Failed to submit city request. Please try again.' });
  }
}

/**
 * Gets aggregated demand stats by city for Admin
 */
export async function getCityRequestStats(req: Request, res: Response) {
  try {
    const query = `
      SELECT 
        TRIM(INITCAP(city)) as city, 
        COUNT(*)::int as count
      FROM city_requests
      GROUP BY TRIM(INITCAP(city))
      ORDER BY count DESC, city ASC
    `;
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching city request stats:', error);
    return res.status(500).json({ error: 'Failed to fetch city demand statistics.' });
  }
}

/**
 * Gets individual city submissions for Admin (with optional city filter)
 */
export async function getCityRequestList(req: Request, res: Response) {
  const { city } = req.query;

  try {
    let query = `
      SELECT 
        id,
        city,
        full_name,
        phone,
        email,
        interested_cars,
        purchase_timeline,
        source,
        created_at
      FROM city_requests
    `;
    const values: any[] = [];

    if (city && typeof city === 'string' && city.trim()) {
      query += ` WHERE LOWER(city) = LOWER($1)`;
      values.push(city.trim());
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching city request list:', error);
    return res.status(500).json({ error: 'Failed to fetch city request list.' });
  }
}

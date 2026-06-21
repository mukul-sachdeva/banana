import { Request, Response } from 'express';
import { pool } from '../config/db';

/**
 * Fetches all cars available for test drives
 */
export async function getCars(req: Request, res: Response) {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY brand ASC, name ASC');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error in getCars controller:', error);
    return res.status(500).json({ error: 'Failed to retrieve cars. Please try again later.' });
  }
}

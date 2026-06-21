import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:@localhost:5432/banana';

export const pool = new Pool({
  connectionString,
})

pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

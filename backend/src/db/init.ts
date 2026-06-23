import { pool } from '../config/db';
import { CREATE_ALL_TABLES } from './schema';

const seedCars = [
  {
    id: 'hyundai-creta',
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    transmission: 'Automatic / Manual',
    fuel_type: 'Petrol / Diesel',
    price_range: '$15,000 - $25,000',
    image_url: 'https://images.unsplash.com/photo-1669818465561-2db4711f1816?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'tata-harrier',
    name: 'Tata Harrier',
    brand: 'Tata',
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    price_range: '$18,000 - $28,000',
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'mahindra-xuv700',
    name: 'Mahindra XUV700',
    brand: 'Mahindra',
    transmission: 'Automatic / Manual',
    fuel_type: 'Petrol / Diesel',
    price_range: '$20,000 - $32,000',
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'kia-seltos',
    name: 'Kia Seltos',
    brand: 'Kia',
    transmission: 'Automatic / Manual',
    fuel_type: 'Petrol / Diesel',
    price_range: '$14,000 - $24,000',
    image_url: 'https://images.unsplash.com/photo-1631880383161-0df8fa24cc0e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'honda-elevate',
    name: 'Honda Elevate',
    brand: 'Honda',
    transmission: 'CVT / Manual',
    fuel_type: 'Petrol',
    price_range: '$13,000 - $21,000',
    image_url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600'
  }
];

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('Initializing database tables...');
    await client.query('BEGIN');
    
    // Create tables
    await client.query(CREATE_ALL_TABLES);
    
    // Ensure 'city' column exists in bookings table (migration helper)
    await client.query(`
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS city VARCHAR(100);
    `);

    // Remove NOT NULL constraints on bookings table dynamically (except 'id')
    const notNullColumnsResult = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'bookings' 
        AND is_nullable = 'NO' 
        AND column_name != 'id'
        AND table_schema = 'public';
    `);

    for (const row of notNullColumnsResult.rows) {
      const colName = row.column_name;
      console.log(`Removing NOT NULL constraint from bookings.${colName}...`);
      await client.query(`ALTER TABLE bookings ALTER COLUMN "${colName}" DROP NOT NULL`);
    }
    console.log('Tables verified/created.');

    // Seed cars if empty
    const checkCarsResult = await client.query('SELECT COUNT(*) FROM cars');
    const count = parseInt(checkCarsResult.rows[0].count, 10);
    
    if (count === 0) {
      console.log('Seeding cars database...');
      for (const car of seedCars) {
        await client.query(
          `INSERT INTO cars (id, name, brand, transmission, fuel_type, price_range, image_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [car.id, car.name, car.brand, car.transmission, car.fuel_type, car.price_range, car.image_url]
        );
      }
      console.log('Cars seeded successfully.');
    } else {
      console.log('Cars database already contains data. Skipping seed.');
    }

    await client.query('COMMIT');
    console.log('Database initialization complete.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database initialization failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

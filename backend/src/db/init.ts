import { pool } from '../config/db';

const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cars (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    price_range VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    car_id VARCHAR(50) REFERENCES cars(id) ON DELETE CASCADE,
    city VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

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
    await client.query(createTablesSQL);
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

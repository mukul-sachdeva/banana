export interface UserDb {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  created_at: Date;
}

export interface CarDb {
  id: string;
  name: string;
  brand: string;
  transmission: string;
  fuel_type: string;
  price_range: string;
  image_url: string;
  created_at: Date;
}

export interface BookingDb {
  id: number;
  user_id: number;
  car_id: string;
  city: string | null;
  preferred_date: Date | null;
  preferred_time_slot: string | null;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at: Date;
}

export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

export const CREATE_CARS_TABLE = `
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
`;

export const CREATE_BOOKINGS_TABLE = `
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    car_id VARCHAR(50) REFERENCES cars(id) ON DELETE CASCADE,
    city VARCHAR(100),
    preferred_date DATE,
    preferred_time_slot VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

export const CREATE_ALL_TABLES = `
  ${CREATE_USERS_TABLE}
  ${CREATE_CARS_TABLE}
  ${CREATE_BOOKINGS_TABLE}
`;

# ⚡ Flowzap - Test Drive Booking MVP

Flowzap is a modern, responsive, mobile-first full-stack web application that allows users to request car test drives online in minutes.

The project is built using **TypeScript** across the entire stack, featuring a React frontend powered by **Vite**, a RESTful API powered by **Express.js**, and data persistence managed by **PostgreSQL**.

---

## 🚀 Quick Start with Docker (Recommended)

To run the entire stack (Database, Backend, and Frontend) in containers, ensure you have **Docker** and **Docker Compose** installed, then run:

```bash
# Clone or navigate to the project directory
cd banana

# Build and start the services
docker-compose up --build
```

The application services will spin up as follows:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Postgres Database**: Running internally on port `5432`

---

## 🛠️ Running Locally for Development

If you prefer to run the application directly on your host machine, you will need a running PostgreSQL instance.

### 1. Database Configuration
Ensure a PostgreSQL database is available, and set up your environment variables. You can create a `.env` file inside the `backend/` folder:
```env
DATABASE_URL=postgres://postgres:@localhost:5432/banana
PORT=5000
```
*(If no URL is provided, the backend falls back to `postgres://postgres:@localhost:5432/banana`)*.

### 2. Install & Start Everything
We have prepared root-level npm scripts to install and run both servers concurrently:

```bash
# 1. Install dependencies for the root, backend, and frontend
npm run install:all

# 2. Run both the backend and frontend concurrently in development mode
npm run dev
```

- **Vite Dev Server** starts at: [http://localhost:3000](http://localhost:3000)
- **Express Backend** starts at: [http://localhost:5000](http://localhost:5000)

---

## 💾 Zero-Config Database Auto-Initialization

To make onboarding seamless:
- On startup, the Backend database pool connects and automatically creates the three required tables (`users`, `cars`, `bookings`) if they do not exist.
- It automatically seeds the database with the initial fleet of 5 vehicles:
  1. **Hyundai Creta**
  2. **Tata Harrier**
  3. **Mahindra XUV700**
  4. **Kia Seltos**
  5. **Honda Elevate**

---

## 🔑 Admin Console Passcode
The Admin bookings portal simulates a protected page to view bookings and modify status values.
- **Passcode**: `banana` (or `admin123`)

---

## 🗃️ Database Schema

### `users`
Tracks customer profiles. Users are identified by their unique phone number, preventing duplicate user accounts.
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### `cars`
Stores information about the test-drive fleet.
```sql
CREATE TABLE cars (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  transmission VARCHAR(50) NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  price_range VARCHAR(100) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### `bookings`
Links users and cars with a scheduled date, location, and time slot.
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  car_id VARCHAR(50) REFERENCES cars(id) ON DELETE CASCADE,
  city VARCHAR(100) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time_slot VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'Completed', 'Cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🌐 API Specifications (REST)

### 🚗 Cars API
#### **Get All Cars**
* **Endpoint**: `GET /api/cars`
* **Response**: `200 OK`
  ```json
  [
    {
      "id": "hyundai-creta",
      "name": "Hyundai Creta",
      "brand": "Hyundai",
      "transmission": "Automatic / Manual",
      "fuel_type": "Petrol / Diesel",
      "price_range": "$15,000 - $25,000",
      "image_url": "https://images.unsplash.com/photo-1669818465561-2db4711f1816..."
    }
  ]
  ```

---

### 📅 Bookings API
#### **Submit Booking Request**
* **Endpoint**: `POST /api/bookings`
* **Request Body**:
  ```json
  {
    "name": "Sarah Connor",
    "phone": "+1234567890",
    "email": "sarah@cyberdyne.com",
    "city": "Los Angeles",
    "carId": "mahindra-xuv700",
    "preferredDate": "2026-06-25",
    "preferredTimeSlot": "11:00 AM - 01:00 PM"
  }
  ```
* **Response**: `201 Created`
  ```json
  {
    "bookingId": "B-4",
    "carName": "Mahindra XUV700",
    "preferredDate": "2026-06-25",
    "preferredTimeSlot": "11:00 AM - 01:00 PM",
    "message": "Your test drive request has been submitted. Dealer will contact you shortly."
  }
  ```

---

### 🛡️ Admin API
#### **Get All Bookings**
* **Endpoint**: `GET /api/bookings/admin`
* **Response**: `200 OK`
  ```json
  [
    {
      "id": 4,
      "formatted_id": "B-4",
      "city": "Los Angeles",
      "preferred_date": "2026-06-25",
      "preferred_time_slot": "11:00 AM - 01:00 PM",
      "status": "Pending",
      "customer_name": "Sarah Connor",
      "customer_phone": "+1234567890",
      "customer_email": "sarah@cyberdyne.com",
      "car_name": "Mahindra XUV700",
      "car_brand": "Mahindra"
    }
  ]
  ```

#### **Update Booking Status**
* **Endpoint**: `PATCH /api/bookings/admin/:id/status`
* **Request Body**:
  ```json
  {
    "status": "Confirmed"
  }
  ```
* **Response**: `200 OK`
  ```json
  {
    "message": "Booking status updated successfully.",
    "booking": {
      "bookingId": "B-4",
      "status": "Confirmed"
    }
  }
  ```

---

## 🔮 Future-Ready Architecture

The code has been architected with future scale in mind:
- **`backend/src/services/sms.ts`**: Contains trigger hooks to alert customers via SMS (e.g. ready for Twilio integration).
- **`backend/src/services/dealer.ts`**: Implements basic geographical matching to auto-assign dealerships (ready to link with showroom location lookup tables).
- **`backend/src/services/notification.ts`**: System hooks to notify admins of incoming reservations (ready for SendGrid email alerts or Slack webhooks).

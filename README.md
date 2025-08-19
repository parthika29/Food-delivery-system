
# On-Demand Home Cook Food Delivery Platform

## Overview
This project is a MERN stack application for ordering home-cooked food from local chefs. It features user authentication, chef profiles, menu management, order processing, payment integration, and live order tracking.



## Project Structure

```
Food-delivery-project/

├── backend/
│   ├── models/         # Mongoose models (User, Chef, Menu, Order, Payment, etc.)
│   ├── routes/         # Express route handlers
│   ├── controllers/    # Business logic for each route
│   ├── config/         # Configuration files (database, passport, etc.)
│   ├── scripts/        # Seed scripts and sample data
│   ├── public/         # Static/public assets (uploads, docs, etc.)
│   ├── middleware/     # Express middleware (auth, error handling, etc.)
│   ├── server.js       # Main server entry point
│   └── ...
├── frontend/
│   ├── src/            # React source code
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Page components (auth, admin, chef, user, etc.)
│   │   ├── assets/     # Images, styles, etc.
│   │   ├── App.jsx     # Main React app
│   │   └── main.jsx    # React entry point
│   ├── public/         # Static assets (index.html, favicon, images)
│   ├── package.json    # Frontend dependencies
│   └── ...
├── README.md           # Project documentation
└── ...
```


---

## Backend Setup
1. **Install dependencies:**
   cd backend
   npm install
2. **Configure environment:**(Already created)
   - Create a `.env` file in `backend` with:
     env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     
3. **Run the backend server:**
   
   npm run dev
   
   (or `npm start` for production)

---

## Frontend Setup
1. **Install dependencies:**
   
   cd frontend
   npm install
   
2. **Run the frontend app:**
   
   npm run dev
   
   (or `npm start` if using Create React App)

---

## Seeding the Database(Sample data)

**Seed data:**
   
   cd backend
   node scripts/seed.js
   
   This will populate your database with sample users, chefs, menus, orders, and payments. You can modify or expand the sample data in `backend/scripts/data/`.

---

## Usage Notes
- Backend runs on port `5000` by default.
- Frontend runs on port `5173` (Vite) or `3000` (CRA) by default.
- Update sample data in `backend/scripts/data/` as needed and rerun the seed script to refresh the database.
- For API endpoints and more details, see code comments and folder structure.

---

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Check `.env` for correct connection string.
- For more sample data, update JSON files in `backend/scripts/data/` and rerun the seed script.
- If you encounter errors, check your terminal output for details.

---


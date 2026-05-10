# AM FRAMES PHOTOGRAPHY - Studio Website

A professional photography portfolio and studio management web application. Built with React (Vite), Express, and Tailwind CSS.

## Features

- **Dynamic Portfolio**: Showcase photos and videos (Direct upload or YouTube/Instagram links).
- **Service Management**: Detailed service cards with WhatsApp integration.
- **Admin Dashboard**: Manage gallery works and view booking inquiries.
- **Booking System**: clients can submit booking requests via a simple form.
- **Local Storage**: Uses a JSON database and local file system for uploads (No complex database setup required).

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone or download the repository.
2. Open a terminal in the project root.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### Admin Access

- **URL**: `http://localhost:3000/admin`
- **Default Username**: `admin`
- **Default Password**: `password123`
*(You can change these in `db.json` after the first run)*

## Production Deployment

To build the application for production:
```bash
npm run build
```

To run the production server:
```bash
npm start
```

## Configuration

- **Database**: Data is stored in `db.json` in the root directory.
- **Uploads**: Images and videos uploaded via the admin panel are stored in the `uploads/` folder.
- **Environment**: You can create a `.env` file based on `.env.example` if you need to use the Gemini AI features.

---
Created by AM FRAMES PHOTOGRAPHY

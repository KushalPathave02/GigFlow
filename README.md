# GigFlow

GigFlow is a full-stack application that allows users to post gigs and bid on them. It is built with the MERN stack (MongoDB, Express, React, Node.js) and features a robust backend with JWT authentication and a responsive frontend built with Tailwind CSS.

## Features

- User registration and login with JWT authentication
- Create, read, and update gigs
- Place bids on gigs
- Hire freelancers for gigs with atomic transactions
- Dashboard to view personal gigs and bids

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1.  Clone the repo

    ```sh
    git clone https://github.com/your-username/gigflow.git
    ```

2.  Install backend dependencies

    ```sh
    cd backend
    npm install
    ```

3.  Install frontend dependencies

    ```sh
    cd ../frontend
    npm install
    ```

4.  Create a `.env` file in the `backend` directory and add the following variables:

    ```
    PORT=5000
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    CLIENT_URL=http://localhost:3000
    ```

### Running the Application

1.  Start the backend server

    ```sh
    cd backend
    npm run dev
    ```

2.  Start the frontend development server

    ```sh
    cd ../frontend
    npm run dev
    ```

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/gigs?search=`: Get all open gigs
- `POST /api/gigs`: Create a new gig
- `POST /api/bids`: Place a bid on a gig
- `GET /api/bids/:gigId`: View all bids for a gig
- `PATCH /api/bids/:bidId/hire`: Hire a freelancer for a gig

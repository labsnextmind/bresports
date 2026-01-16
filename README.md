# BR E-Sports Full-Stack Tournament App

This project is a complete full-stack web application for managing e-sports tournaments. It includes a user-facing frontend for players and a comprehensive admin panel for management.

## Project Structure

- **Frontend:** The root directory (`/`) contains the React/Vite frontend application.
- **Backend:** The `/server` directory contains the Node.js, Express, and MySQL backend API.
- **Database:** The `/database` directory contains the SQL schema to set up your database.

## Prerequisites

- **Node.js:** Make sure you have Node.js installed (v16 or higher).
- **MySQL:** You need a running MySQL server. You can install it locally or use a cloud service.

## Setup Instructions

Follow these steps carefully to get the application running on your local machine.

### 1. Database Setup

1.  **Create the Database:**
    -   Connect to your MySQL server.
    -   Create a new database named `bresports_db`. You can use this command:
        ```sql
        CREATE DATABASE bresports_db;
        ```

2.  **Import the Schema:**
    -   Use the created database: `USE bresports_db;`
    -   Import the table structure by running the contents of the `/database/schema.sql` file in your MySQL client. This will create all the necessary tables.

### 2. Backend Server Setup

1.  **Navigate to the Server Directory:**
    ```bash
    cd server
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    -   Rename the `.env.example` file to `.env`.
    -   Open the new `.env` file and fill in your details:
        -   `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Your MySQL database credentials.
        -   `JWT_SECRET`: A long, random, secret string for securing user sessions.
        -   `API_KEY`: **(Required for AI Features)** Your Google Gemini API key.

4.  **Create an Admin User (Optional):**
    -   To access the admin panel, you need an admin user. Run the following SQL command in your `bresports_db` database. This creates an admin with the password `Admin@123`.
        ```sql
        -- The password 'Admin@123' is bcrypted here. Do not change the hash.
        INSERT INTO admins (email, password) VALUES ('admin@bresports.com', '$2a$10$f.3iA6S.H2Iunb6752765u3gS5b4Y2M6a9e8.5f7g9H0j/K1L2M3O');
        ```
    -   **Admin Login:**
        -   **Email:** `admin@bresports.com`
        -   **Password:** `Admin@123`


5.  **Start the Server:**
    ```bash
    npm start
    ```
    The backend API should now be running on `http://localhost:5000`.

### 3. Frontend Setup

The frontend is a standard Vite React application and requires its own dependencies and development server.

1.  **Install Frontend Dependencies:**
    -   From the project's **root directory** (not the `/server` directory), run:
        ```bash
        npm install
        ```

2.  **Start the Frontend Development Server:**
    -   In the same root directory, run:
        ```bash
        npm run dev
        ```
    -   This will start the frontend application, usually on `http://localhost:5173`. The terminal will show you the correct address.

3.  **Access the Application:**
    -   Open your web browser and go to the address provided by the `npm run dev` command.
    -   The application should load. The Vite server will automatically proxy API requests to your backend server.
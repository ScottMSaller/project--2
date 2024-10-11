// server.js
import express, { json } from 'express';
const app = express();
import userRoutes from './routes/userRoutes.js'; // Import your routes
import sequelize from './config/connection.js';

app.use(json()); // Middleware to parse JSON requests

// Routes
app.use('/api/users', userRoutes);

// Test database connection and sync models
async function startServer() {
    try {
        // Sync models (create tables if they don't exist)
        await sequelize.sync({ force: false }); // Set to `false` to avoid dropping existing tables
        console.log('Database models synchronized successfully.');

        // Start the Express server
        const PORT = 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the function to start the server
startServer();

// server.js
import express, { json } from 'express';
const app = express();
import sequelize from './models/index.js'; // Assuming your Sequelize instance is in models/index.js or ./models
import userRoutes from './routes/userRoutes.js'; // Import your routes

app.use(json()); // Middleware to parse JSON requests

// Routes
app.use('/api/users', userRoutes);

// Test database connection and sync models
async function startServer() {
    try {
        // Test the connection
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Sync models (create tables if they don't exist)
        await sequelize.sync({ force: true }); // Set to `false` to avoid dropping existing tables
        console.log('Database models synchronized successfully.');

        // Start the Express server
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the function to start the server
startServer();

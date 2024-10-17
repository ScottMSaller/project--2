import express, { json } from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes.js'; 
import sequelize from './config/connection.js';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON requests
app.use(json()); 

// API Routes
app.use('/api/users', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catchall handler for React routes (only for non-API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Test database connection and sync models
async function startServer() {
    try {
        // Sync models (create tables if they don't exist)
        await sequelize.sync({ force: false }); // Set to `false` to avoid dropping existing tables
        console.log('Database models synchronized successfully.');

        // Start the Express server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the function to start the server
startServer();

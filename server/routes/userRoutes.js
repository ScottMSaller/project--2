// routes/userRoutes.js
import express from 'express';
import signUpUser from '../services/userService.js';
import loginUser from '../services/userService.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const result = await signUpUser(username, email, password);

    res.json(result); // Send the response back to the client
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginUser(username, password);
        // Handle successful login, e.g., generate a JWT token or start a session
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});




export default router;

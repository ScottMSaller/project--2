// routes/userRoutes.js
import express from 'express';
import signUpUser from '../services/userService.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const result = await signUpUser(username, email, password);

    res.json(result); // Send the response back to the client
});

export default router;

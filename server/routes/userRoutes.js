import express from 'express';
import { signUpUser } from '../services/userService.js';
import { loginUser } from '../services/userService.js';
import { Recipe, User } from '../models/index.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer scheme

    if (!token) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token, forbidden
        req.user = user; // Attach user info from token to the request object
        next();
    });
};

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const result = await signUpUser(username, email, password);

    res.json(result); // Send the response back to the client
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const { user, token } = await loginUser(username, password);
        res.json({ user, token }); // Return the token along with the user data
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post('/my-recipes', authenticateToken, async (req, res) => {
    try {
        // Extract user from JWT
        const userId = req.user.id;
        console.log(userId)
        // Extract recipe details from request body
        const { image, label, url } = req.body;

        // Log the request body to check if it's correctly passed
        console.log("Request Body:", req.body);

        // Create a new recipe
        const newRecipe = await Recipe.create({
            imageUrl: image,
            title: label,
            url: url
        });

        // Log the newly created recipe to ensure it's working
        console.log("New Recipe Created:", newRecipe);

        // Associate recipe with the user
        const user = await User.findByPk(userId);
        await user.addRecipe(newRecipe);

        // Respond with success
        res.json({ message: 'Recipe successfully added', recipe: newRecipe });
    } catch (error) {
        // Log the error for more information
        console.error('Error adding recipe:', error);
        res.status(500).json({ error: 'Failed to add recipe' });
    }
});

router.get('/:userId/recipes', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  console.log(`API called with userId: ${userId}`);

  try {
    // Check if the JWT middleware passed
    console.log(`Authenticated user: ${req.user.id}`);

    // Find the user and include the associated recipes
    const user = await User.findByPk(userId, {
      include: {
        model: Recipe,
        through: { attributes: [] }, // Exclude junction table data if not needed
      },
    });

    // Log if the user is not found
    if (!user) {
      console.log('User not found in database');
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the recipes
    console.log('Recipes found for user:', user.Recipes);

    // Send the list of liked recipes as a response
    res.json(user.Recipes);
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;

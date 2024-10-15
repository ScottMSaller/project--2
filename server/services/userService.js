// services/userService.js
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import bcrypt from 'bcrypt';
import { User, Recipe  }  from '../models/index.js';
console.log(User);
console.log(process.env.JWT_SECRET)

async function signUpUser(username, email, password) {
    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username }});

        if (existingUser) {
            return { message: 'Username or email already taken' };
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return { message: 'User successfully registered', user: newUser };

    } catch (error) {
        console.error('Error signing up user:', error);
        return { message: 'Error signing up user', error };
    }
}

const loginUser = async (username, enteredPassword) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(enteredPassword, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
        { id: user.id, username: user.username }, // Payload
        process.env.JWT_SECRET, // Secret key from environment variable
        { expiresIn: '15m' } // Token expiration
    );

    return { user, token };
};

const addRecipeToUser = async (userId, recipeData) => {
    try {
      // Step 1: Find the user
      const user = await User.findByPk(userId);
  
      if (!user) {
        return { success: false, message: 'User not found' };
      }
  
      // Step 2: Create the recipe
      const newRecipe = await Recipe.create(recipeData);
  
      // Step 3: Associate the recipe with the user
      await user.addRecipe(newRecipe);
  
      return { success: true, message: 'Recipe added and associated with user', recipe: newRecipe };
    } catch (error) {
      console.error('Error adding recipe to user:', error);
      return { success: false, message: 'Error adding recipe to user', error };
    }
  };

export {signUpUser as signUpUser, loginUser as loginUser, addRecipeToUser as addRecipeToUser}

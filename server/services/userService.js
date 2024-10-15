// services/userService.js
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
console.log(User);

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
    // Retrieve the user from the database
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(enteredPassword, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
}

export default {signUpUser, loginUser};

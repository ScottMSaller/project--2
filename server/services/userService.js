// services/userService.js
import bcrypt from 'bcrypt';
import Users from '../models/index.js';
import Sequelize from 'sequelize';

async function signUpUser(username, email, password) {
    try {
        // Check if the username or email already exists
        const existingUser = await Users.findOne({ 
            where: { 
                [Sequelize.Op.or]: [{ username }, { email }] 
            } 
        });

        if (existingUser) {
            return { message: 'Username or email already taken' };
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await Users.create({
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

export default signUpUser;

import Sequelize from 'sequelize';
import UserModel from './User.js';
import RecipeModel from './Recipes.js';

// Initialize Sequelize instance
const sequelize = new Sequelize('postgres://user:password@localhost:5432/test_db');

// Initialize models
const User = UserModel(sequelize);
const Recipe = RecipeModel(sequelize);

// Define relationships
User.belongsToMany(Recipe, { through: 'UserRecipes' });
Recipe.belongsToMany(User, { through: 'UserRecipes' });

// Sync models
sequelize.sync();

export default {
  User,
  Recipe,
  sequelize,
};

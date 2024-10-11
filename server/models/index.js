import User from './User.js';
import Recipe from './Recipes.js';
import sequelize from '../config/connection.js';


// Initialize models
const UserInstance = User(sequelize);
const RecipeInstance = Recipe(sequelize);

// Define relationships
UserInstance.belongsToMany(RecipeInstance, { through: 'UserRecipes' });
RecipeInstance.belongsToMany(UserInstance, { through: 'UserRecipes' });

export default {
  User,
  Recipe,
};

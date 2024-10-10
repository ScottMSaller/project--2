import Sequelize from 'sequelize';
import User from './User.js';
import Recipe from './Recipes.js';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'recipe_boss_db' ,
  username: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  ssl: true,
  clientMinMessages: 'warning',
});
// Initialize models
const UserInstance = User(sequelize);
const RecipeInstance = Recipe(sequelize);

// Define relationships
UserInstance.belongsToMany(RecipeInstance, { through: 'UserRecipes' });
RecipeInstance.belongsToMany(UserInstance, { through: 'UserRecipes' });

// Sync models
sequelize.sync();

export default {
  User,
  Recipe,
  sequelize,
};

import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
    const RecipeModel = sequelize.define('Recipe', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return RecipeModel;
  };

  
import { DataTypes } from "sequelize";

const Recipe = (sequelize) => {
    return sequelize.define('Recipe', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }
export default Recipe;
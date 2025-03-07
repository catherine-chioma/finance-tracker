const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Budget extends Model {}

  Budget.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Budget",
    }
  );

  return Budget;
};

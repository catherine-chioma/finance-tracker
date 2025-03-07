const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RecurringTransaction extends Model {}

  RecurringTransaction.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING, // e.g., daily, weekly, monthly
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RecurringTransaction",
    }
  );

  return RecurringTransaction;
};

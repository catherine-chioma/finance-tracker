const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database'); // Adjust according to your DB setup

class User extends Model {
  // Method to check if password matches
  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  // Method to check if the email is verified
  async isEmailVerified() {
    return this.isEmailVerified;
  }
}

// Initialize the User model
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default is false until the email is verified
    },
    emailVerificationToken: {
      type: DataTypes.STRING, // Token for email verification
      allowNull: true,
    },
    emailVerificationExpires: {
      type: DataTypes.DATE, // Expiration date for email verification token
      allowNull: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING, // Token for password reset
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE, // Expiration date for password reset token
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
      // Before user is created, hash the password
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

module.exports = User;



'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate() {
      // define association here
    }
  }

  Users.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    useremail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    userpassword: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 50],
          msg: "Password length should be between 8 to 50 characters"
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          msg: "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        }
      },
      allowNull: false
    },
    usertype: {
      type: DataTypes.ENUM('Premium', 'standard'),
      defaultValue: 'standard'
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.userpassword) {
          const salt = await bcrypt.genSalt(10);
          user.userpassword = await bcrypt.hash(user.userpassword, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.userpassword) {
          const salt = await bcrypt.genSalt(10);
          user.userpassword = await bcrypt.hash(user.userpassword, salt);
        }
      }
    },
    sequelize,
    modelName: 'Users',
  });

  return Users;
};

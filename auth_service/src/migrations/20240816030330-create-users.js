/* eslint-disable no-unused-vars */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      useremail: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail:true
        },
        
      },
      userpassword: {
        type : Sequelize.STRING,
        validate :{
          len: {
            args: [8, 50],
            msg: "Password length should be between 8 to 50 characters"
        },
        is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            msg: "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        }
        },
        allowNull: false,
      },
      usertype: {
        type: Sequelize.ENUM('Premium', 'standard'),
        defaultValue: 'standard'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
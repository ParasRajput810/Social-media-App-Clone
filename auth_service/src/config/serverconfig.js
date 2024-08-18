/* eslint-disable no-undef */
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    Port: process.env.Port,
   
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}
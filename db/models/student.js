const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
});

Student.addHook('beforeCreate', user => {
  user.firstName =
    user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
});

Student.addHook('beforeCreate', user => {
  user.lastName =
    user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
});

module.exports = Student;

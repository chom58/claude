const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReviewHelpful = sequelize.define('ReviewHelpful', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reviewId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  helpful: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = ReviewHelpful;

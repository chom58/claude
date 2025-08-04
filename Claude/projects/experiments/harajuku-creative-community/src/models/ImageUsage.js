const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ImageUsage = sequelize.define('ImageUsage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = ImageUsage;

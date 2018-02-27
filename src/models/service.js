/* jshint indent: 2 */
let DataTypes = require('sequelize');
// var sequelize = require('./sequelize');
import sequelize from './sequelize';

module.exports = sequelize.define('service', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title_zh: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  desc_zh: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  list_zh: {
    type: DataTypes.JSON,
    allowNull: true
  },
  title_en: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  desc_en: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  list_en: {
    type: DataTypes.JSON,
    allowNull: true
  },
  banner: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}, {
  tableName: 'service'
});

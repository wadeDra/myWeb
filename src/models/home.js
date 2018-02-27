/* jshint indent: 2 */
let DataTypes = require('sequelize');
// var sequelize = require('./sequelize');
import sequelize from './sequelize';

module.exports = sequelize.define('home', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title_zh: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  title_en: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  title_desc_zh: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  title_desc_en: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  title_one_zh: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  title_one_en: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  banner: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  title_one_desc_en: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  title_one_desc_zh: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  imgs: {
    type: DataTypes.JSON,
    allowNull: true
  },
  title_two_zh: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  title_two_en: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  title_two_desc_zh: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  title_two_desc_en: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  title_two_desc_two_zh: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  title_two_desc_two_en: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'home'
});

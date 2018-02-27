/* jshint indent: 2 */
let DataTypes = require('sequelize');
// var sequelize = require('./sequelize');
import sequelize from './sequelize';

module.exports = sequelize.define('about', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title_en: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  title_zh: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  subtitle_en: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  subtitle_zh: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  desc_zh: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  desc_en: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  content_zh: {
    type: DataTypes.JSON,
    allowNull: true
  },
  content_en: {
    type: DataTypes.JSON,
    allowNull: true
  },
  banner: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  img: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  address_en: {
    type: DataTypes.JSON,
    allowNull: true
  },
  address_zh: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'about'
});

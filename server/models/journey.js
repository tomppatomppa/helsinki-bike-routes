const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/database')

class Journey extends Model {}

Journey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Departure: {
      type: DataTypes.DATE,
    },
    Return: {
      type: DataTypes.DATE,
    },
    Departure_station_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stations', key: 'ID' },
    },
    Departure_station_name: {
      type: DataTypes.STRING,
    },
    Return_station_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stations', key: 'ID' },
    },
    Return_station_name: {
      type: DataTypes.STRING,
    },
    Covered_distance_m: {
      type: DataTypes.INTEGER,
    },
    Duration_sec: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'journey',
  }
)

module.exports = Journey

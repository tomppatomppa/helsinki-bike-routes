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
    Departure: {
      type: DataTypes.STRING,
    },
    Departure_station_id: {
      type: DataTypes.INTEGER,
    },
    Departure_station_name: {
      type: DataTypes.STRING,
    },
    Return_station_id: {
      type: DataTypes.INTEGER,
    },
    Return_station_name: {
      type: DataTypes.STRING,
    },
    Covered_distance_m: {
      type: DataTypes.INTEGER,
    },
    Duration_s: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'journey',
  }
)

module.exports = Journey

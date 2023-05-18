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
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    Return: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterDeparture(value) {
          if (value <= this.Departure) {
            throw new Error('Return date must be after departure date')
          }
        },
      },
    },
    Departure_station_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stations', key: 'ID' },
    },
    Departure_station_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Return_station_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stations', key: 'ID' },
    },
    Return_station_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Covered_distance_m: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
      },
    },
    Duration_sec: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 600,
      },
    },
  },
  {
    sequelize,
    modelName: 'journey',
  }
)

module.exports = Journey

const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/database')

class Station extends Model {}

Station.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'station',
  }
)

module.exports = Station

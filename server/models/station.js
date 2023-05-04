const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/database')

class Station extends Model {}

Station.init(
  {
    FID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    Nimi: {
      type: DataTypes.STRING,
    },
    Namn: {
      type: DataTypes.STRING,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Osoite: {
      type: DataTypes.STRING,
    },
    Adress: {
      type: DataTypes.STRING,
    },
    Kaupunki: {
      type: DataTypes.STRING,
    },
    Operaattor: {
      type: DataTypes.STRING,
    },
    Kapasiteet: {
      type: DataTypes.STRING,
    },
    x: {
      type: DataTypes.FLOAT,
    },
    y: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: 'station',
  }
)

module.exports = Station

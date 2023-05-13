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
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    Namn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    Osoite: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    Adress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    Kaupunki: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    Stad: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    Operaattor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    Kapasiteet: {
      type: DataTypes.INTEGER,
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

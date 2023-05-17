const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/database')

class Station extends Model {}

Station.init(
  {
    FID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        min: 1,
        isInt: true,
      },
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
      validate: {
        len: [0, 50],
      },
    },
    Stad: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: [0, 50],
      },
    },
    Operaattor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: [0, 50],
      },
    },
    Kapasiteet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
        isNumeric: true,
      },
    },
    x: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        min: -90,
        max: 90,
      },
    },
    y: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        min: -180,
        max: 180,
      },
    },
  },

  {
    sequelize,
    modelName: 'station',
    primaryKey: 'FID',
    hooks: {
      beforeValidate: (instance) => {
        Object.keys(instance.dataValues).forEach((key) => {
          if (typeof instance[key] === 'string') {
            instance[key] = instance[key].trim()
          }
        })
      },
    },
  }
)

module.exports = Station

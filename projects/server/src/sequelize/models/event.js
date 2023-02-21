'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({event_rates, status, room}) {
      this.belongsTo(status, {foreignKey: 'status_id'})
      this.belongsTo(event_rates, {foreignKey: 'event_rates_id'})
      this.belongsTo(room, {foreignKey: 'room_id'})
    }
  }
  event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNullL: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNullL: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event_rates_id:  {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room_id:  {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'event',
    freezeTableName: true
  });
  return event;
};
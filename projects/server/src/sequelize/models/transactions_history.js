'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({transactions, status, review}) {
      this.belongsTo(transactions, {foreignKey: 'transactions_id'})
      this.belongsTo(status, {foreignKey: 'status_id'})
      this.hasMany(review, {foreignKey: 'transactions_history_id'})
    }
  }
  transactions_history.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    transactions_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_id:  {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'transactions_history',
    freezeTableName: true
  });
  return transactions_history;
};
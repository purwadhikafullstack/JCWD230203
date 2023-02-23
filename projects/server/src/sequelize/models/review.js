'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, transactions_history}) {
      this.belongsTo(users,{foreignKey: 'users_id'})
      this.belongsTo(transactions_history, {foreignKey: 'transactions_history_id'})
    }
  }
  review.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    users_id:{
      type: DataTypes.UUID,
      allowNull: false
    },
    transactions_history_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'review',
    freezeTableName: true
  });
  return review;
};
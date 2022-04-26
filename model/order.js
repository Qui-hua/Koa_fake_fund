
const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');


// 定義表
const order = sequelize.define(
  'order',
  {
    id: {
      type: Sequelize.INTEGER(11), // 設定型態
      primaryKey: true, // 设置为主键 設定為主ＫＥＹ
      autoIncrement: true // 自動增加
    },
    fundNo: {
      type: Sequelize.INTEGER(11), // 設定型態
    },
    accountID: {
      type: Sequelize.INTEGER(11),
    },

    orderMoney: {
      type: Sequelize.FLOAT, // 設定型態
    },
    orderNumber: {
      type: Sequelize.FLOAT,
    },
    orderType: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.TEXT,
    },
    effectiveDate: {
      type: Sequelize.DATE,
    },

  },
  {

    //sequelize會自動使用傳入的模型名（define的第一個參數）的複數做為表名 設置true取消默認設置
    freezeTableName: true
  }
);

module.exports = order;

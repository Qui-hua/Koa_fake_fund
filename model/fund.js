
const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');


// 定義表
const fund = sequelize.define(
  'fund',
  {
    id: {
      type: Sequelize.INTEGER(11), // 設定型態
      primaryKey: true, // 设置为主键 設定為主ＫＥＹ
      autoIncrement: true // 自動增加
    },

    currency: {
      type: Sequelize.TEXT, // 設定型態

    },
    name: {
      type: Sequelize.TEXT,
    },
    info: {
      type: Sequelize.TEXT,
    },
    tyep: {
      type: Sequelize.TEXT,
    },
    NAV: {
      type: Sequelize.FLOAT,
    },
    NAVUpdateTime: {
      type: Sequelize.DATE,
    },


  },
  {

    //sequelize會自動使用傳入的模型名（define的第一個參數）的複數做為表名 設置true取消默認設置
    freezeTableName: true
  }
);
module.exports = fund;

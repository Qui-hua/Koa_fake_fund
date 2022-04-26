
const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');


// 定義表
const maillist = sequelize.define(
  'maillist',
  {
    id: {
      type: Sequelize.INTEGER(11), // 設定型態
      primaryKey: true, // 设置为主键 設定為主ＫＥＹ
      autoIncrement: true // 自動增加
    },

    Email: {
      type: Sequelize.TEXT, // 設定型態

    },
    title: {
      type: Sequelize.TEXT,
    },
    msg: {
      type: Sequelize.TEXT,
    },
    sent: {
      type: Sequelize.TEXT,
    },

  },
  {

    //sequelize會自動使用傳入的模型名（define的第一個參數）的複數做為表名 設置true取消默認設置
    freezeTableName: true
  }
);
module.exports = maillist;

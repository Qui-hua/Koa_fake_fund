
const path = require('path');//引入原生path模塊
const log4js = require('koa-log4');//引入koa-log4

log4js.configure({
  appenders: {
    //訪問日誌
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //通過日期來生成文件
      alwaysIncludePattern: true, //文件名始終以日期區分
      encoding:"utf-8",
      filename: path.join('logs/', 'access.log') //生成文件路徑和文件名
    },
    //系統日誌
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //通過日期來生成文件
      alwaysIncludePattern: true, //文件名始終以日期區分
      encoding:"utf-8",
      filename: path.join('logs/', 'application.log') //生成文件路徑和文件名
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' },
    access: { appenders: [ 'access' ], level: 'info' },
    application: { appenders: [ 'application' ], level: 'WARN'}
  }
});

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); //記錄所有訪問級別的日誌
exports.logger = log4js.getLogger('application');  //記錄所有應用級別的日誌

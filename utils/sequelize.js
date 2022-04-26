const Sequelize = require('sequelize');


// const sequelize = new Sequelize('mysql://test:test@localhost:8889/work')

// 使用sequelize操作數據庫，必須導入數據庫依賴包，這裏導的是mysql2
const sequelize = new Sequelize('work', 'test', 'test', {
    dialect: 'mysql',
    host: 'localhost',
    port: '8889',
    logging: true, // 是否顯示SQL語句
    timezone: "+08:00", // 時區，如果沒有設置，會導致數據庫中的時間字段與中國時區時間相差8小時
    define: {
        timestamps: true, // 是否自動創建時間字段， 默認會自動創建createdAt、updatedAt
        // paranoid: true, // 是否自動創建deletedAt字段
        createdAt: "createTime", // 重命名字段
        updatedAt: "updateTime",
        // underscored: true // 開啓下劃線命名方式，默認是駝峯命名
    }
});


sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......');
  })
  .catch(err => {
    console.error('链接失败:', err);
  });
// 根据模型自动创建表
//sequelize.sync();
module.exports = sequelize;

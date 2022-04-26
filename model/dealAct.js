

const account = require('../model/account');
const order = require('../model/order');
const maillist = require('../model/maillist');
const fund = require('../model/fund');

async function sendMail(params) {

  ///// 訂單資料查詢
    let orderData = await order.findOne({
      where: { id: Number(params.orderID) }
    });
    if (orderData ==null) {
        console.log();("error, order No"+params.fundNo+" not found");
        return ;
    }

  ///// 基金帳戶查詢
    let accountData = await account.findOne({
      where: { id: Number(orderData.accountID) }
    });
    if (accountData ==null) {
        console.log();("error, account No"+orderData.accountID+" not found");
        return ;
    }


      ///// 基金資料查詢
    let fundData = await fund.findOne({
      where: { id: Number(orderData.fundNo) }
    });
    if (fundData ==null) {
        console.log();("error, fund No"+params.fundNo+" not found");
        return ;
    }
    

    var mail={
      Email:accountData.Email,
      title:"Your fund has been traded",
      msg:"Your fund " +fundData.name+" has been traded",
    };
    maillist.create(mail);
          console.log("444");

    return "OK";

}




module.exports = {  sendMail};

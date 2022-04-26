
const order = require('../model/order');
const fake_bank = require('../model/fake_bank');
const account = require('../model/account');
const fund = require('../model/fund');
const maillist = require('../model/maillist');

async function orderCheck(params) {

  ///// 基金帳戶檢查
    let accountData = await account.findOne({
      where: { id: Number(params.accountID) }
    });
    if (accountData ==null) {
        let result = orderAddNG(params,"2001") ;//帳戶資料有誤
        return result;
    }

      ///// 銀行帳戶檢查
    let bankData = await fake_bank.findOne({
      where: { id: Number(accountData.bankID) }
    });
    if (bankData ==null) {
        let result = orderAddNG(params,"2002") ;//銀行資料有誤
        return result;
    }
    if (params.orderType =="M") {
      if (bankData.money <params.orderMoney) {
          let result = orderAddNG(params,"2005") ;//銀行餘額不足
          var mail={
            Email:accountData.Email,
            title:"Insufficient balance",
            msg:"you want to buy "+params.orderMoney+", but you only have "+bankData.money ,
          };
          maillist.create(mail);
          return result;
      }
    }

      ///// 基金資料檢查
    let fundData = await fund.findOne({
      where: { id: Number(params.fundNo) }
    });
    if (fundData ==null) {
        let result = orderAddNG(params,"2003") ;//基金資料有誤
        return result;
    }

    if (bankData.currency !=fundData.currency) {
        let result = orderAddNG(params,"2004") ;//該銀行無此幣別
        return result;
    }



    let date = new Date();
    //date.setDate(date.getDate() + 1);
    var dayTime = date.getHours()+date.getMinutes();
    var effectiveDate= date.getFullYear()+"-"+ (parseInt(date.getMonth()) + parseInt(1))+"-"+date.getDate();
    var colseTime = 1400;
    if (dayTime >= colseTime)  //如果超過營業時間，生效日往後加一
    {
        effectiveDate= date.getFullYear()+"-"+ (parseInt(date.getMonth()) + parseInt(2))+"-"+date.getDate();
    }

    var mail={
      Email:accountData.Email,
      title:"Your order data",
      msg:"You order " +fundData.name+" OK effective date "+effectiveDate,
    };

    params.type="ok";
    params.effectiveDate=effectiveDate;
    let result = await order.create(params);

    await maillist.create(mail);
    return result;

}


async function orderAddNG(params,type) {

    params.type =type;
    let result = await order.create(params);

    return result;
}

module.exports = {  orderCheck};

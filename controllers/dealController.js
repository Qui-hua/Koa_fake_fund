const deal = require('../model/deal');
const dealAct = require('../model/dealAct');

///查詢，如過沒有給pageSize 預設為10 沒有給page預設設為1
const list = async ctx => {
  //console.log(ctx);
  const params = ctx.query;

  let pageSize = params.pageSize || 10;
  let page = params.page || 1;
  //console.log(pageSize);
  //console.log(page);

  const { rows: data, count: total } = await deal.findAndCountAll({
    offset: (+ page - 1) * + pageSize,
    limit: + pageSize,
    order: [['id']]
  });
  ctx.body = {
    data,
    total
  };
};


///依照id查詢
const queryByID = async ctx => {
  const params = ctx.query;
  if (!params.id) {
    ctx.body = {
      code: 300,
      msg: 'id不能為空'
    };
    return false;
  }
  if ( isNaN(params.id) ) {

      ctx.body = {
        code: 1005,
        msg: '銀行帳號要為整數'
      };
      return false;
  }
  let result = await queryByIDAct(ctx,params.id);

  console.log(result);
  ctx.body = result;
};

async function queryByIDAct(ctx,id) {

  let result = await deal.findOne({
    where: { id: Number(id) }
  });

  if (result ==null) {
    result = {
      code: 1004,
      msg: '查無此id'
    };
  }
  return result;
}


//新增
const create = async ctx => {
  const params = ctx.request.body;

  if (!params.orderID) {
    ctx.body = {
      code: 1003,
      msg: '下單編號不能為空'
    };
    return false;
  }
  if (   isNaN(params.orderID)  ) {

      ctx.body = {
        code: 1005,
        msg: '下單編號要為整數'
      };
      return false;
  }
  if (!params.accountID) {
    ctx.body = {
      code: 1003,
      msg: '客戶帳號不能為空'
    };
    return false;
  }
  if (   isNaN(params.accountID)  ) {

      ctx.body = {
        code: 1005,
        msg: '客戶帳號要為整數'
      };
      return false;
  }
  try {
    let result = await deal.create(params);
    //console.log(result);
    ctx.body = {
      code: 100,
      msg: '新增成功',
      data:result.dataValues,
    };
     dealAct.sendMail(params);

  } catch (err) {
    ctx.body = {
      code: 300,
      data: err
    };
  }
};




module.exports = {  list,queryByID,create};

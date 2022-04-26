const order = require('../model/order');
const orderAct = require('../model/orderAct');

///查詢，如過沒有給pageSize 預設為10 沒有給page預設設為1
const list = async ctx => {
  //console.log(ctx);
  const params = ctx.query;

  let pageSize = params.pageSize || 10;
  let page = params.page || 1;
  //console.log(pageSize);
  //console.log(page);

  const { rows: data, count: total } = await order.findAndCountAll({
    offset: (+ page - 1) * + pageSize,
    limit: + pageSize,
    order: [['id']]
  });
  ctx.body = {
    data,
    total
  };
  orderAct.test();

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

  if (  isNaN(params.id)  ) {

      ctx.body = {
        code: 1005,
        msg: '下單編號要為整數'
      };
      return false;
  }



  let result = await queryByIDAct(ctx,params.id);

  console.log(result);
  ctx.body = result;
};

async function queryByIDAct(ctx,id) {

  let result = await order.findOne({
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

  if (!params.fundNo) {
    ctx.body = {
      code: 1003,
      msg: '基金編號不能為空'
    };
    return false;
  }
  if (  isNaN(params.fundNo)  ) {

      ctx.body = {
        code: 1005,
        msg: '基金編號要為整數'
      };
      return false;
  }
  if (!params.accountID) {
    ctx.body = {
      code: 1003,
      msg: '帳戶編號不能為空'
    };
    return false;
  }

  if (  isNaN(params.accountID)  ) {

      ctx.body = {
        code: 1005,
        msg: '帳戶編號要為整數'
      };
      return false;
  }
  if (!params.orderType) {
    ctx.body = {
      code: 1003,
      msg: '下單類型不能為空'
    };
    return false;
  }

  if (params.orderType =="M") {

    if (!params.orderMoney) {
      ctx.body = {
        code: 1003,
        msg: '下單金額不能為空'
      };
      return false;
    }
  }
  else if (params.orderType =="N"){

    if (!params.orderNumber	) {
      ctx.body = {
        code: 1003,
        msg: '下單數量不能為空'
      };
      return false;
    }
  }
  else {

      ctx.body = {
        code: 1006,
        msg: '下單類型只能Ｍ或Ｎ'
      };
      return false;
  }

  try {
    //let result = await order.create(params);

    let result =await orderAct.orderCheck(params);
    //console.log(result);
    ctx.body = {
      code: 100,
      msg: '新增成功',
      data:result.dataValues,
    };
  } catch (err) {
    ctx.body = {
      code: 300,
      data: err
    };
  }
};
const updateByID = async ctx => {
  const params = ctx.request.body;
  if (!params.id) {
    ctx.body = {
      code: 1003,
      msg: 'id不能為空'
    };
    return false;
  }

  if (  isNaN(params.id) ) {

      ctx.body = {
        code: 1005,
        msg: '下單編號要為整數'
      };
      return false;
  }
  let result = await queryByIDAct(ctx,params.id);
  //console.log(result);
  //console.log("!!!!!!!!!!");

  if (result.code ==1004)
  {
    ctx.body = result;
    return false;
  }

  await order.update(params, {
    where: { id: params.id }
  });


  result = await order.findOne({
    where: { id: Number(params.id) }
  });
  //  console.log(result);
  ctx.body = {
    code: 100,
    msg: '修改成功',
    data:result.dataValues,
  };
};
const deleteByID = async ctx => {

  const params = ctx.request.body;
  if (!params.id) {
    ctx.body = {
      code: 1003,
      msg: 'id不能為空'
    };
    return false;
  }
  if (  isNaN(params.id)  ) {

      ctx.body = {
        code: 1005,
        msg: '下單編號要為整數'
      };
      return false;
  }
  let result =await queryByIDAct(ctx,params.id);
  if (result.code ==1004)
  {
    ctx.body = result;
    return false;
  }
  await order.destroy({ where: {id: Number(params.id) }});

  ctx.body = {
    code: 100,
    msg: '删除成功',
    id:params.id
  };
};



module.exports = {  list,queryByID,create,updateByID,deleteByID};

const fake_bank = require('../model/fake_bank');





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

  if (   isNaN(params.id)   ) {

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

  let result = await fake_bank.findOne({
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


//購買基金
const buy = async ctx => {
  const params = ctx.request.body;

  if (!params.ID) {
    ctx.body = {
      code: 1003,
      msg: '銀行帳號不能為空'
    };
    return false;
  }
  if (   isNaN(params.id)    ) {

      ctx.body = {
        code: 1005,
        msg: '銀行帳號要為整數'
      };
      return false;
  }


  let result =await queryByIDAct(ctx,params.id);
  if (result.code ==1004)
  {
    ctx.body = result;
    return false;
  }

    await fake_bank.update(params, {
      where: { id: params.id }
    });


    result = await fake_bank.findOne({
      where: { id: Number(params.id) }
    });
    //  console.log(result);
    ctx.body = {
      code: 100,
      msg: '修改成功',
      data:result.dataValues,
    };

};




module.exports = {  queryByID,buy};

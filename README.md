
# 基金買賣api
    透過API對mysql DB中的資料進行新增、修改、查詢與刪除的功能，以達到模擬基金買賣的功能。
    主要透過使用者下單和基金交易所回傳成交資訊進行模擬。

# 執行方式
    在根目錄下打底下值令即可執行
    supervisor ./bin/www 


## 模擬使用者下單
    
    /order
        將客戶下單資料以Post方式傳送表單至API。底下為JavaScript傳送資料的範例，其中orderType可以設定為N/M，N代表以數量為單位進行下單，使用單位下單時需要帶orderNumber參數（浮點數），Ｍ代表以金額方式下單使用單位下單時需要帶orderMoney參數（浮點數）。如下單資訊有各種錯誤，會在type傳遞錯誤代碼，如下單成功則會帶"ok"


    var settings = {
      "url": "http://localhost:5566/order",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "orderID": "222",
        "fundNo": "1",
        "orderMoney": "100",
        "accountID": "3",
        "orderType": "M"
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

    回傳結果
    {
    "code": 100,
    "msg": "新增成功",
    "data": {
        "id": 64,
        "fundNo": "1",
        "orderMoney": "100",
        "orderType": "M",
        "accountID": "3",
        "type": "2005",
        "updateTime": "2022-04-26T12:07:44.849Z",
        "createTime": "2022-04-26T12:07:44.849Z"
        }
    }
    

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/orderdata.png)
上圖透過postman下單

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/fundOrder.jpg)
上圖為此下單流程的sequence diagram



## 模擬交易所回傳成交訊息
    
    /deal
        將交易所成交資料以Post方式傳送表單至API。底下為JavaScript傳送資料的範例。

    var settings = {
      "url": "http://localhost:5566/deal",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "orderID": "64",
        "fundId": "2",
        "accountID": "3",
        "money": "33.8",
        "number": "11.2"
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    
    
    回傳結果
    {
    "code": 100,
    "msg": "新增成功",
    "data": {
        "id": 23,
        "orderID": "64",
        "accountID": "3",
        "money": "33.8",
        "number": "11.2",
        "updateTime": "2022-04-26T12:41:02.281Z",
        "createTime": "2022-04-26T12:41:02.281Z"
        }
    }

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/dealdata.png)
上圖透過postman操作

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/funddeal.jpg)
上圖為此交易所回傳成交訊息的sequence diagram


## 各別資料庫操作

    
    /資料庫名稱/list。（/account/list?pageSize=2&page=1）
        可透過上面API對個資料庫進行操作(上面是對account進行操作)，將資料以清單方式呈現，可透過get方式傳送請求，可帶pageSize和page調整查詢的頁數和一頁有幾筆資料，如沒帶相關條件則預設一頁有十筆，查詢第一頁。 底下為JavaScript傳送資料的範例。
        
    var settings = {
      "url": "http://localhost:5566/account/list?pageSize=2&page=1",
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    
    回傳結果
    
    {
    "data": [
        {
            "id": 3,
            "name": "qqq1",
            "bankID": "2",
            "Email": "hhh@mail",
            "agreementList": null,
            "createTime": "2022-04-24T05:30:10.000Z",
            "updateTime": "2022-04-25T17:58:12.000Z"
        },
        {
            "id": 4,
            "name": "name",
            "bankID": "2",
            "Email": null,
            "agreementList": null,
            "createTime": "2022-04-24T05:30:52.000Z",
            "updateTime": "2022-04-25T16:52:42.000Z"
        }
    ],
    "total": 11
    }

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/account_list_get.png)
上圖透過postman操作


    /資料庫名稱/?id=3。（/account/?id=3）
        可透過上面API對個資料庫進行操作(上面是對account進行操作)，可透過get方式傳送請求，透過id查詢該表的資料。 底下為JavaScript傳送資料的範例。
    var settings = {
      "url": "http://localhost:5566/account/?id=3",
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    
    
    回傳結果
    {
        "id": 3,
        "name": "qqq1",
        "bankID": "2",
        "Email": "hhh@mail",
        "agreementList": null,
        "createTime": "2022-04-24T05:30:10.000Z",
        "updateTime": "2022-04-25T17:58:12.000Z"
    }
    
![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/account_get.png)
上圖透過postman操作



    /資料庫名稱。（/order）
        可透過上面API對個資料庫進行操作(上面是對order進行操作)，可透過POST方式傳送請求，新增該表資料。 底下為JavaScript傳送資料的範例。
    
    
    var settings = {
      "url": "http://localhost:5566/order",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "orderID": "222",
        "fundNo": "1",
        "orderMoney": "100",
        "accountID": "3",
        "orderType": "M"
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

    回傳結果
    {
    "code": 100,
    "msg": "新增成功",
    "data": {
        "id": 64,
        "fundNo": "1",
        "orderMoney": "100",
        "orderType": "M",
        "accountID": "3",
        "type": "2005",
        "updateTime": "2022-04-26T12:07:44.849Z",
        "createTime": "2022-04-26T12:07:44.849Z"
        }
    }
    

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/orderdata.png)
上圖透過postman操作


    /資料庫名稱。（/order）
        可透過上面API對個資料庫進行操作(上面是對order進行操作)，可透過PUT方式傳送請求，透過id當作條件，修改該表資料。 底下為JavaScript傳送資料的範例。
        
    var settings = {
      "url": "http://localhost:5566/order",
      "method": "PUT",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "orderID": "222",
        "id": "2",
        "fundNo": "1",
        "orderType": "M",
        "orderMoney": "0.1",
        "accountID": "3"
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    
    回傳結果
    {
        "code": 100,
        "msg": "修改成功",
        "data": {
            "id": 2,
            "fundNo": 1,
            "accountID": 3,
            "orderMoney": 0.1,
            "orderNumber": null,
            "orderType": "M",
            "type": "ok",
            "effectiveDate": "2022-04-26",
            "createTime": "2022-04-26T13:13:12.000Z",
            "updateTime": "2022-04-26T13:13:17.000Z"
        }
    }
    

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/order_put.png)
上圖透過postman操作



    /資料庫名稱。（/order）
        可透過上面API對個資料庫進行操作(上面是對order進行操作)，可透過DELETE方式傳送請求，透過id當作條件，刪除該表資料。 底下為JavaScript傳送資料的範例。
        
    var settings = {
      "url": "http://localhost:5566/order/",
      "method": "DELETE",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "id": "71"
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    
    回傳結果
    {
        "code": 100,
        "msg": "删除成功",
        "id": "71"
    }
    

![image](https://github.com/Qui-hua/Koa_fake_fund/blob/main/img/order_delete.png)
上圖透過postman操作

    

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


////這邊加入路由資訊

const account = require('./routes/account')
const agreement = require('./routes/agreement')
const deal = require('./routes/deal')
const fake_bank = require('./routes/fake_bank')
const fund = require('./routes/fund')
const maillist = require('./routes/maillist')
const order = require('./routes/order')




const {  accessLogger,systemLogger, } = require('./logger');
app.use(accessLogger()); //log




// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(account.routes(), account.allowedMethods())
app.use(agreement.routes(), agreement.allowedMethods())
app.use(deal.routes(), deal.allowedMethods())
app.use(fake_bank.routes(), fake_bank.allowedMethods())
app.use(fund.routes(), fund.allowedMethods())
app.use(maillist.routes(), maillist.allowedMethods())
app.use(order.routes(), order.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

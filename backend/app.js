const Koa = require("koa")
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const path = require('path')
const router = require("./router/index")
const JWT = require("./util/JWT")
const app = new Koa()

// 配置跨域
// app.use(cors())
app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      return ctx.header.origin;
      // return 'http://localhost:8080'; // 只允许http://localhost:8080这个域名的请求
      // return '*'; // 允许来自所有域名请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept',
      'Origin', 'X-Requested-With', 'user_id', 'login_id', 'token', 'app_link'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Authorization'] //设置获取其他自定义字段
  })
)

// 设置静态文件夹
app.use(static( path.join( __dirname, "public" ) ))

// post请求的请求体解析中间件，ctx.body
app.use(bodyParser())

// JWT认证校验
app.use(async (ctx, next) => {
  if (ctx.url.includes("login")) {
    await next()
    return
  }
  const token = ctx.headers["authorization"]?.split(" ")[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      //重新计算token过期时间
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, "1h")
      ctx.set("Authorization", newToken)
      await next()
    } else {
      ctx.status = 401
      ctx.body = { errCode: -1, errInfo: "token exprires" } 
    }
  } else {
    await next()
  }
})

// 设置路由前缀
router.prefix('/api')

// allowedMethods 以其它方式请求报405，不加会报404
app.use(router.routes()).use(router.allowedMethods())

// 处理Vue的history模式
app.use(async (ctx) => {
  ctx.type = "html",
  ctx.body = require("fs").createReadStream(path.join(__dirname, "public", "index.html"))
})

app.listen(3000)
  .on('listening', () => {
    console.log(`Listening on port: 3000`);
  });
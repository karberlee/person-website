const Router = require("koa-router")
const router = new Router()
// const user = require("./user")
const loginRouter = require("./loginRouter")
const listRouter = require("./listRouter")

// router.use('/user', user.routes(), user.allowedMethods())
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods())
router.use('/list', listRouter.routes(), listRouter.allowedMethods())

module.exports = router
const Router = require("koa-router")
const router = new Router()
const loginController = require("../controllers/loginController")

router.post("/", loginController.login)

module.exports = router

const assert = require("assert")
const JWT = require("../util/JWT")

exports.login = async (ctx) => {
  const params = { ...ctx.params, ...ctx.request.body }
  try {
    assert(params.email, "Invalid parameter 'email'")
    assert(params.password, "Invalid parameter 'password'")
    let userInfo = userDataList.find(item => item.email == params.email && item.password == params.password)
    if (userInfo) {
      const token = JWT.generate({ id: userInfo.id, email: userInfo.email }, "1d")
      ctx.set("Authorization", token)
      ctx.body = { status: "success" }
    } else {
      ctx.log.error("error:", `Invalid email:${params.email} or password:${params.password}`, )
      ctx.status = 401
      ctx.body = { status: "fail", message: "Invalid email or password" }
    }
  } catch (error) {
    ctx.log.error("error:", error)
    ctx.status = 500
    ctx.body = { status: "fail", message: error.message }
  }
}

const userDataList = [
  { id: 0 , email: "admin@foxmail.com", password: "password" },
  { id: 1 , email: "karber@foxmail.com", password: "123456" },
  { id: 2 , email: "rex@abc.com", password: "888888" },
  { id: 3 , email: "kiwi@abc.com", password: "666666" },
]

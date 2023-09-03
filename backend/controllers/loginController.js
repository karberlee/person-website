const assert = require("assert")
const JWT = require("../util/JWT")

exports.login = async (ctx) => {
  const params = { ...ctx.params, ...ctx.request.body }
  try {
    assert(params.username, "Invalid parameter 'username'")
    assert(params.password, "Invalid parameter 'password'")
    let userInfo = userDataList.find(item => item.username == params.username && item.password == params.password)
    if (userInfo) {
      const token = JWT.generate({ id: userInfo.id, username: userInfo.username }, "1d")
      ctx.set("Authorization", token)
      ctx.body = { status: "success" }
    } else {
      ctx.log.error("error:", `Invalid username:${params.username} or password:${params.password}`, )
      ctx.status = 401
      ctx.body = { status: "fail", message: "Invalid username or password" }
    }
  } catch (error) {
    ctx.log.error("error:", error)
    ctx.status = 500
    ctx.body = { status: "fail", message: error.message }
  }
}

const userDataList = [
  { id: 0 , username: "admin", password: "password" },
  { id: 1 , username: "Karber", password: "123456" },
  { id: 2 , username: "Rex", password: "888888" },
  { id: 3 , username: "Kiwi", password: "666666" },
]

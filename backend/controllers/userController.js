const assert = require("assert")
const format = require("pg-format")
const pg = require("../libs/pg")

exports.listUser = async (ctx) => {
  const params = { ...ctx.params, ...ctx.request.body }
  try {
    assert(params.status, "Invalid parameter 'status'")
    let sqlParams = [params.status]
    let sql = "select * from user where user.status = $1"
    let res = await pg.query(ctx, sql, sqlParams)
    assert(res.code == 0, `get user list error: ${res.msg}`)
    ctx.body = { status: "success", data: res.data }
  } catch (error) {
    ctx.log.error("error:", error)
    ctx.status = 500
    ctx.body = { status: "fail", message: error.message }
  }
}

exports.addUsers = async (ctx) => {
  const params = { ...ctx.params, ...ctx.request.body }
  try {
    assert(params.users && params.users.length > 0, "Invalid parameter 'users'")
    let sqlFormat = format("insert into user (email, password, status) values %L", params.users)
    let res = await pg.query(ctx, sqlFormat, [])
    assert(res.code == 0, `add users error: ${res.msg}`)
    ctx.body = { status: "success", data: res.data }
  } catch (error) {
    ctx.log.error("error:", error)
    ctx.status = 500
    ctx.body = { status: "fail", message: error.message }
  }
}
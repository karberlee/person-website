const pg = require('pg')

const pool = new pg.Pool({
  user: "",
  host: "",
  database: "",
  password: "",
  port: "",
  ssl: {
    rejectUnauthorized: false,
  }
})

pool.on("error", (err, client) => {
  // console log
  process.exit(-1)
})

exports.query = async (ctx, sql, params) => {
  const client = await pool.connect()
  try {
    const res = client.query(sql, params)
    return {
      code: 0,
      data: res.rows,
      msg: "",
    }
  } catch (error) {
    ctx.log.error("Unexpected error on pg client", error)
    return {
      code: 801,
      data: [],
      msg: error,
    }
  } finally {
    client.release()
  }
}
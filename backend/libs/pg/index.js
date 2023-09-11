const pg = require('pg')

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
  // ssl: false
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
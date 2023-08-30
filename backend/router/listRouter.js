const Router = require("koa-router")
const router = new Router()

router.get("/",(ctx)=>{
    ctx.body=["111","222","333"]
})
.put("/:id",(ctx)=>{
    ctx.body={ok:1,info:"list update"}
})
.post("/",(ctx)=>{
    ctx.body={ok:1,info:"list post"}
})
.del("/:id",(ctx)=>{
    ctx.body={ok:1,info:"list del"}
})

module.exports = router
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.use(require('./route/geo').routes())
const PORT = process.env.PORT || 8080
app.listen(PORT,err =>{
    if(err){
        console.error(err)
        return
    }
    console.log("working on", PORT)
})
module.exports = app
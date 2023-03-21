const express = require('express')
const natsConnect =require('./events/nats')
natsConnect()
require('./db/mongoose')
const productRouter = require('./routers/productRoutes')
const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(productRouter);

app.listen(port,()=>{
    console.log(`server is on port ${port}`)
})
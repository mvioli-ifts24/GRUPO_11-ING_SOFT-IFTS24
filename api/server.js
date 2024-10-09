const express = require('express')
const rootRouter = require('./routes')
const app = express()
const port = 3000

app.use(express.json())

app.use('/', rootRouter)

app.listen(port, () => {
  console.log(`La API esta corriendo en el puerto ${port}`)
})
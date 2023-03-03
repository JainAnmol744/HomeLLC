const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
var cors = require('cors')

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`HomeLLC backend listening on port http://localhost:${port}`)
})



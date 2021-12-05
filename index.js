const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000

const indexRouter = require('./routes/index')
app.use('/',indexRouter)

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})

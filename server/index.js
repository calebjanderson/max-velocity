const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.use(express.static(path.join(__dirname, '../client')))
app.use('/scripts', express.static(path.join(__dirname, '../node_modules')))
const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
  console.log('Server listening on port ', PORT)
})

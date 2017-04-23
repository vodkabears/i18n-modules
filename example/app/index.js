const path = require('path')

const express = require('express')

const render = require('./render')

const PORT = 3333

const app = express()

app.use('/assets', express.static(path.resolve(__dirname, '..', 'build', 'assets')))

app.get('/', (req, res) => {
  res.status(200).send(render(req))
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/?lang=ru`))

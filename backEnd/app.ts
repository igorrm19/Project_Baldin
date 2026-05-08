import express from 'express'

const app = express()

app.get(['/', '/api'], (_req, res) => {
  res.send('Hello World!')
})

export default app

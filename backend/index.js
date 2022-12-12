const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())

app.get('/api/filelist', (req, res) => {
  res.send([
    {
      name: 'hello_world.txt'
    },
    {
      name: 'dummy.txt'
    }
  ])
})

app.get('/api/files/:file', (req, res) => {
  const { file } = req.params
  res.send({
    file,
    payload: `Some payload here from the file: ${file}`
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

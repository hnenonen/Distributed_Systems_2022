const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const fs = require('fs')
const fileupload = require('express-fileupload')

const uploadDir = './data'
app.use(cors())
app.use(fileupload({
  useTempFiles : true,
  tempFileDir : uploadDir
}))

app.get('/api/filelist', (req, res) => {
  const files = fs.readdirSync(uploadDir).map(f => {
    return { name: f }
  })
  res.send(files)
})

app.get('/api/files/:file', (req, res) => {
  const { file } = req.params
  res.send({
    file,
    payload: `Some payload here from the file: ${file}`
  })
})

app.get('/api/download/:file', (req, res) => {
  const { file } = req.params
  fs.exists(`${uploadDir}/${file}`, function (exists) {
    if (!exists) {
      res.sendStatus(500)
    }
  })
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + file
  })
  fs.createReadStream(`${uploadDir}/${file}`).pipe(res)
  return
})

app.post('/api/files', (req, res) => {
  try {
    console.log(req.files.file)
    const { name, tempFilePath } = req.files.file
    fs.rename(tempFilePath, `${uploadDir}/${name}`, (err) => {
      if (err) throw err
      console.log('File saved: ', name)
    })
    res.send('STATUS')
  } catch(e) {
    console.log(req.files)
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

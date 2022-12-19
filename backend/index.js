/**
 * Express application to handle HTTP-requests.
 */

const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const fs = require('fs')
const fileupload = require('express-fileupload')
const amqp = require('amqplib/callback_api')
const { networkInterfaces } = require('os')

const uploadDir = './data'
app.use(cors())
app.use(fileupload({
  useTempFiles : true,
  tempFileDir : uploadDir
}))

const getIp = () => {
  // Get pods IP-address
  const nets = networkInterfaces()
  console.log('Getting IP: ', nets.eth0[0].address)
  return nets.eth0[0].address
}

const sendMessage = file => {
  // Send a fanout message to RabbitMQ exchange
  const ip = getIp()
  const host = process.env.HOSTNAME
  amqp.connect(`amqp://${process.env.RABBITMQ_PORT_5672_TCP_ADDR}:5672`, function (error0, connection) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }
      const exchange = 'files'
      const msg = { address: ip, file: file, host }
      console.log(msg)
      channel.assertExchange(exchange, 'fanout', {
        durable: false
      })
      channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)))
      console.log(' [x] Sent %s', msg)
    })
  })
}

app.get('/api/', (req, res) => {
  // A basic apiroot for debugging purposes
  res.json({ 'files': '/api/filelist' })
})

app.get('/api/filelist', (req, res) => {
  const files = fs.readdirSync(uploadDir).map(f => {
    return { name: f }
  })
  console.log('Request /api/filelist')
  res.send({ files, host: process.env.HOSTNAME })
})

app.get('/api/files/:file', (req, res) => {
  const { file } = req.params
  console.log('Request /api/files/file')
  res.send({
    file,
    payload: `Some payload here from the file: ${file}`,
    host: process.env.HOSTNAME
  })
})

app.get('/api/download/:file', (req, res) => {
  const { file } = req.params
  console.log('Request /api/download/file')
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
  // Upload a file and send a MQ message
  try {
    console.log(req.files.file)
    const { name, tempFilePath } = req.files.file
    fs.rename(tempFilePath, `${uploadDir}/${name}`, (err) => {
      if (err) throw err
      console.log('File saved: ', name)
    })
    res.send('Uploaded')
    sendMessage(name)
  } catch(e) {
    console.log(req.files)
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


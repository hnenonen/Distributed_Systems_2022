/**
 * Application to listen a RabbitMQ queue in Kubernetes cluster
 */

const amqp = require('amqplib/callback_api')
const { networkInterfaces } = require('os')
const fetch = require('node-fetch');
const fs = require('fs')

const getIp = () => {
    const nets = networkInterfaces()
    console.log('Getting IP: ', nets.eth0[0].address)
    return nets.eth0[0].address
}

const fetchFile = async msg => {
  /**
   * Fetch a file based on a message.
   * Fetching from an IP-address
   * Does not fetch from pod that sent the message
   */
    const json = JSON.parse(msg)
    const host = process.env.HOSTNAME
    if (json.host === host) {
        return "Already on the host"
    }
    const url = `http://${json.address}:3001/api/download/${json.file}`
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(`./data/${json.file}`);
    await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    }).then(r => {
        console.log(r)
        return "Done"
    });
    return "Done"
}

amqp.connect(`amqp://${process.env.RABBITMQ_PORT_5672_TCP_ADDR}:5672`, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'files';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        if(msg.content) {
            console.log(" [x] %s", msg.content.toString());
            console.log(fetchFile(msg.content.toString()))
          }
      }, {
        noAck: true
      });
    });
  });
});

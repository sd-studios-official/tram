const { Client } = require("yuuko");
const Eris = require("eris");
const path = require("path");
const config = require("../config.json");
const express = require("express");
const logger = require("fancy-log");
const quickdb = require("quick.db");
const prompt = require("prompt-sync")({ sigint: true });
const io = require('@pm2/io');
const http = require('http');
const net = require('net');
var url=require('url');
const fs = require('fs').promises;

const db = quickdb;
const app = express();

const client = new Client({
  token: config.token,
  prefix: config.prefix,
  ignoreBots: true,
});

client.extendContext = {
  botDB: db,
  io: io,
};

client.editStatus("dnd", { name: "things", type: 3 });

client.on("interactionCreate", (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    console.log(interaction.data.id);
    switch (interaction.data.name) {
      case "edited_test_command":
        interaction.createMessage("mno recieved");
        return client.deleteCommand(interaction.data.id);
      case "test_chat_input":
        interaction.createMessage("interaction recieved");
        return client.deleteCommand(interaction.data.id);
      default: {
        return interaction.createMessage("interaction recieved");
      }
    }
  }
});

client.addDir(path.join(__dirname, "commands"));
client.addDir(path.join(__dirname, "events"));
client.connect();

// pm2.io monitoring
const apiTotalReqs = io.counter({
  name: 'Total Request Count',
  id: 'app/realtime/requests'
})

const apiReqs = io.counter({
  name: 'Total Request Count',
  id: 'app/realtime/requests'
})

// api weird things

const requestListener = function (req, res) {
  apiReqs.inc();
  apiTotalReqs.inc()

  var pathname=url.parse(req.url).pathname;

  switch(pathname){
    case "/summerServe.css":
      fs.readFile(__dirname + "/server/styles/summerServe.css")
          .then(contents => {
            res.setHeader("Content-Type", "text/css");
            res.writeHead(200);
            res.end(contents);
          })
      break;
    case "/info":
      fs.readFile(__dirname + "/server/views/summerServeInfo.html")
          .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
          })
    break;
    case '/tram-api/status/text':
      res.end('Status: Online\nMaintenance: None Planned');
    break;
    default:
      fs.readFile(__dirname + "/server/views/summerServe.html")
          .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
          })
  }

  req.on('end', () => {
    apiReqs.dec()
  })
}

const server = http.createServer(requestListener);
server.listen(3000, 'localhost', () => {
  logger.info(`API: Running on port 3000`)
})

// // DB Delete
// const guildId = prompt("GuildID:");
// try {
//   db.delete(guildId);
// } catch (e) {
//   logger.warn(`Error: ${e}`);
// }

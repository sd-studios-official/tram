const { Client } = require("yuuko");
const Eris = require("eris");
const path = require("path");
const config = require("../config.json");
const express = require("express");
const logger = require("fancy-log");
const quickdb = require("quick.db");
const prompt = require("prompt-sync")({ sigint: true });

const db = quickdb;
const app = express();

const client = new Client({
  token: config.token,
  prefix: config.prefix,
  ignoreBots: true,
});

client.extendContext = {
  botDB: db,
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

// api weird things

app.listen(3000, () => {
  logger.info(`API: Running on port 3000`);
});

app.get("/tram-api/status/text", (req, res, next) => {
  res.status(200);
  res.send("Status: Online");
});

app.get("/tram-api/status/json", (req, res, next) => {
  res.status(200);
  res.json(["Online"]);
});

app.get("/tram-api/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "./dashboard/views/index.html"));
});

// // DB Delete
// const guildId = prompt("GuildID:");
// try {
//   db.delete(guildId);
// } catch (e) {
//   logger.warn(`Error: ${e}`);
// }

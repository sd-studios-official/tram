const { Client } = require("yuuko");
const path = require("path");
const config = require("../config.json");
const express = require("express");
const logger = require("fancy-log");
const quickdb = require("quick.db");

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

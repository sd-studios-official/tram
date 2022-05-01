const { Command } = require("yuuko");
const logger = require("fancy-log");
const qdb = require("quick.db");
const db = qdb;
const prompt = require("prompt-sync")({ sigint: true });
module.exports = new Command("unblock-guild", async (msg, args, ctx) => {
  if (
    msg.author.id !== "942554411199266826" ||
    msg.author.id !== "701561771529470074"
  )
    return;
  msg.channel.createMessage({
    embed: {
      title: "Unblock Request Sent",
      description: "Please check command line to input guild id.",
    },
  });

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(`GuildId?`, (guildId) => {
    // console.log(`Unlocking server ${guildId}`);
    readline.close();
    try {
      db.delete(guildId);
      msg.channel.createMessage({
        embed: {
          title: "Server Unblocked",
          description: "Server has been unblocked.",
        },
      });
    } catch (e) {}
  });
});

module.exports.help = {
  desc: "Unblocks a guild by removing from database.",
  args: "None",
  sub: "None",
};

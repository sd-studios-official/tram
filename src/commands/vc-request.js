const { Command } = require("yuuko");
const yuuko = require("yuuko");
const got = require("got");
const logger = require("fancy-log");
const { Guild } = require("eris");
const quickdb = require("quick.db");
const db = quickdb;
module.exports = new Command("vc", async (msg, args, ctx) => {
  if (!args[0]) {
    msg.channel.addMessageReaction(msg.id, "❌");
    return msg.channel.createMessage(
      `${msg.author.mention} Please provide a channel name/reason for the request.`
    );
  }

  const reason = args[0];

  if (!args[1]) {
    msg.channel.addMessageReaction(msg.id, "❌");
    return msg.channel.createMessage(
      `${msg.author.mention} Please mention one person to request to join.`
    );
  }

  const close = new RegExp(/--close/gim).test(args[1]);
  const invite = new RegExp(/--invite/gim).test(args[1]);

  const user = msg.mentions[0];
  const guild = msg.channel.guild;

  // console.log(guild);

  // msg.channel.createInvite({maxUses: 1, reason: 'VC Request - Powered by Tram'}).then(i => {
  //     console.log(i.code)
  // })

  // console.log(reason)

  if (close) {
    if (!db.get(guild.id)) {
      return msg.channel.createMessage({
        embed: {
          title: "Error",
          description:
            "Sorry, there is no active temp VC found. Please DM `person-al#9861` if this is incorrect.",
        },
      });
    }

    ctx.client.deleteChannel(db.get(guild.id), "Temp VC - Powered by Tram");
    db.delete(guild.id);
    return msg.channel.createMessage({
      embed: {
        title: "Channel Delete Successful",
        description: "Voice Channel successfully deleted.",
      },
    });
  }

  if (db.get(guild.id)) {
    return msg.channel.createMessage({
      embed: {
        title: "Error",
        description:
          "Sorry, due to system limitations, only one temp VC can exist at a time.\nWe are working on this but in the mean time close the existing channel.",
      },
    });
  }

  const member = await guild.members.get(user.id);
  let channelCode = "";
  let channelId = 0;

  guild.createChannel(`${reason}`, 2).then((c) => {
    ctx.client.editChannelPermission(
      c.id,
      guild.id,
      0,
      1024,
      0,
      "VC Request - Powered by Tram"
    );
    ctx.client.editChannelPermission(
      c.id,
      msg.author.id,
      1024,
      0,
      1,
      "VC Request - Powered by Tram"
    );
    ctx.client.editChannelPermission(
      c.id,
      user.id,
      1024,
      0,
      1,
      "VC Request - Powered by Tram"
    );
    c.createInvite({ maxUses: 1, reason: "VC Request - Powered by Tram" }).then(
      (i) => {
        db.set(guild.id, i.channel.id);
        channelCode = `https://discord.gg/${i.code}`;
        user.getDMChannel().then((c) => {
          c.createMessage({
            embed: {
              title: "VC Request",
              description: `${msg.author.username} has requested you join a VC with them.\n\nClick the link below to join! Please note that you will auto join the channel.\n${channelCode}`,
            },
          });
        });

        msg.author.getDMChannel().then((c) => {
          c.createMessage({
            embed: {
              title: "VC Request Successful",
              description: `${user.username} was successfully invited to the VC.\n\nPlease join with the link below: \n${channelCode}\n\nPlease run \`tram vc ${reason} --close\` once you are finished to delete the channel.\nTo invite more people run \`tram vc ${reason} --invite @username\`.`,
            },
          });
        });
        // msg.channel.createThreadWithoutMessage({name: `${reason}`, invitable: true, autoArchiveDuration: 60})
      }
    );
  });
});

module.exports.help = {
  desc: "Creates a new VC request.",
  args: "<name> <@username>",
  sub: "--close",
};

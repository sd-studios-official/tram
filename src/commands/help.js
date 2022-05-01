const { Command } = require("yuuko");

module.exports = new Command("help", async (msg, args, ctx) => {
  //   const Commands = ctx.client.commands;
  //   for (let i = 0; i < Commands.length; i++) {
  //     console.log(Commands[i].names[0]);
  //   }
  if (args[0]) {
    const Commands = ctx.client.commands;
    for (let i = 0; i < Commands.length; i++) {
      // console.log(Commands[i].names[0]);
      if (Commands[i].names[0] === args[0]) {
        // console.log(Commands[i].help.desc);
        try {
          msg.channel.createMessage({
            embed: {
              title: `Tram Help - ${args[0]} Command`,
              description: `**Description:** ${Commands[i].help.desc}\n**Args:** ${Commands[i].help.args}\n**Sub Commands:** ${Commands[i].help.sub}`,
            },
          });
        } catch {
          msg.channel.createMessage({
            embed: {
              title: "Error!",
              description: `There is no current data found for ${args[0]}.`,
            },
          });
        }
        break;
      } else {
        continue;
      }
    }
  } else {
    msg.channel.createMessage({
      embed: {
        title: "Tram Help",
        description:
          "Prefix - `tram`\n\n`help [command]` - Displays this command\n`vc <name> <@user>` - Creates a new VC request.",
      },
    });
  }
});

module.exports.help = {
  desc: "Displays the help command.",
  args: "[command]",
  sub: "None",
};

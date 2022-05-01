const { EventListener } = require("yuuko");
const logger = require("fancy-log");
const Eris = require("eris");
const { Constants } = require("eris");

const constants = Eris.Constants;

module.exports = new EventListener("ready", async (ctx) => {
  logger.info(`Tram: Connected into the Discord API`);

  const commands = await ctx.client.getCommands();
  if (!commands.length) {
    ctx.client.createGuildCommand("964238274581393418", {
      name: "test_chat_input",
      description: "Test command to show how to make commands",
      guildID: "964238274581393418",
      options: [
        //An array of Chat Input options https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
        {
          name: "animal", //The name of the option
          description: "The type of animal",
          type: Constants.ApplicationCommandOptionTypes.STRING, //This is the type of string, see the types here https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
          required: true,
          choices: [
            //The possible choices for the options
            {
              name: "Dog",
              value: "animal_dog",
            },
            {
              name: "Cat",
              value: "animal_cat",
            },
            {
              name: "Penguin",
              value: "animal_penguin",
            },
          ],
        },
        {
          name: "only_smol",
          description: "Whether to show only baby animals",
          type: Constants.ApplicationCommandOptionTypes.BOOLEAN,
          required: false,
        },
      ],
      type: Constants.ApplicationCommandTypes.CHAT_INPUT, //Not required for Chat input type, but recommended
    }); //Create a chat input command
  }
});

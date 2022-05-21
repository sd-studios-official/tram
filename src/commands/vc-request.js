const quickdb = require('quick.db');
const db = quickdb;
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'vc-request',
  description: 'Request to vc with someone!',
  // aliases: ['getHelp'],
  category: 'vc',
  slash: true,
  global: false,
  ownerOnly: false,

  options: [
    {
      name: 'reason',
      description: "The reason for the VC. It's also just the name. Go wild.",
      required: true,
      type: 'string'
    },
    {
      name: 'user1',
      description: 'The first user you want to invite. This person is required.',
      required: true,
      type: 'user'
    },
    {
      name: 'user2',
      description: 'The second user you want to invite. This person is not required.',
      require: false,
      type: 'user'
    },
    {
      name: 'user3',
      description: 'The third user you want to invite. This person is not required.',
      require: false,
      type: 'user'
    }
  ],

  run: async (commandData) => {
    const guild = commandData.client.guilds.cache.get(commandData.guild.id)
    const member = guild.members.cache.get(commandData.args[1])
    let everyoneRole = guild.roles.cache.find(r => r.name === '@everyone')

    const user = commandData.client.users.cache.find(u => u.id === commandData.args[1])

    // the third and forth users are set to the author to prevent errors i dont know how to fix
    let user2 = commandData.user
    let user3 = commandData.user
    let totalUserCount = 2
    let userDmd = false

    if (commandData.args[2]) {
      user2 = guild.members.cache.get(commandData.args[2])
      totalUserCount = 3
    }

    if (commandData.args[3]) {
      user3 = guild.members.cache.get(commandData.args[3])
      totalUserCount = 4
    }

    // await commandData.interaction.followUp({ content: `${user} - ${user2} - ${user3}` })

    if (db.get(commandData.user.id)) {
      const embed1 = new MessageEmbed()
        .setTitle('Error')
        .setDescription("For rate-limiting purposes, each user can only have 1 channel linked to a user at any time.\nWe are working on a fix so hold tight!\n\nTo close your current channel, run `/vc-close`!")
        .setColor('RED')
        .setFooter({ text: 'Powered By Tram | Error Code: qN7eg2' })

      return await commandData.interaction.followUp({ embeds: [embed1], ephemeral: true })
    }

    let channelCode = "";
    let channelId = 0;

    await guild.channels.create(commandData.args[0], {
      type: "GUILD_VOICE",
      userLimit: totalUserCount,
      reason: `${commandData.args[0]} | Powered By Tram VC Request`,
      permissionOverwrites: [
        {
          id: everyoneRole.id,
          deny: ['VIEW_CHANNEL', 'CONNECT']
        },
        {
          id: commandData.user.id,
          allow: ['VIEW_CHANNEL', 'CONNECT']
        },
        {
          id: member.id,
          allow: ['VIEW_CHANNEL', 'CONNECT']
        },
        {
          id: user2.id,
          allow: ['VIEW_CHANNEL', 'CONNECT']
        },
        {
          id: user3.id,
          allow: ['VIEW_CHANNEL', 'CONNECT']
        }
      ]
    })
      .then((c) => {
        channelId = c.id;
      })

    await db.set(commandData.user.id, channelId)

    const embed4 = new MessageEmbed()
      .setTitle('VC Request | Feedback Data')
      .addFields(
        { name: 'Name/Reason', value: commandData.args[0] },
        { name: 'Users (May be your user due to bug)', value: `<@${member.id}> <@${user2.id}> <@${user3.id}>` }
      )
      .setColor('GREEN')
      .setFooter({ text: 'Powered By Tram | Use `/vc-close` to end the vc! | Bug Code: 7rRNFx' })

    commandData.user.send({ embeds: [embed4] })

    const embed3 = new MessageEmbed()
      .setTitle('VC Request')
      .setDescription(`You have been asked to join <#${channelId}> by <@${commandData.user.id}>.`)
      .setColor('GREYPLE')
      .setFooter({ text: 'Powered By Tram' })

    user.send({ embeds: [embed3] })

    if (!userDmd) {
      if (commandData.args[2]) {
        let user2m = commandData.client.users.fetch(user2.id, false).then((user) => {
            user.send({ embeds: [embed3] })
        })

      }

      if (commandData.args[3]) {
        let user3m = commandData.client.users.fetch(user3.id, false).then((user) => {
          user.send({ embeds: [embed3] })
        })

      }
    }

    const embed2 = new MessageEmbed()
      .setTitle('Success!')
      .setDescription("All invited users have been invited by DM! More info in DM's.")
      .setColor('GREEN')
      .setFooter({ text: 'Powered By Tram' })

    return await commandData.interaction.followUp({ embeds: [embed2], ephemeral: true })
  }
}

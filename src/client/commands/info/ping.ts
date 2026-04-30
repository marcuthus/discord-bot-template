import * as discord from "discord.js"

import { Command } from "../../interfaces/command"

export const command: Command = {
    name: "ping",
    description: "Envia o ping do bot.",
    type: discord.ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const client = interaction.client
        const ping = client.ws.ping
        const botAvatarUrl = client.user.displayAvatarURL()

        const pingEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: "https://avatars.githubusercontent.com/u/91915075?v=4" })
            .setTitle("Bot's Ping")
            .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}\` ms`)
            .setColor("Random")
            .setThumbnail(botAvatarUrl)

        interaction.reply({ embeds: [pingEmbed], ephemeral: true })
    }
}

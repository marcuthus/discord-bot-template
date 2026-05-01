import * as discord from "discord.js"

import { Command } from "../../interfaces/command"

export const command: Command = {
    name: "ping",
    description: "Envia o ping do bot.",
    type: discord.ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const client = interaction.client
        const botAvatarUrl = client.user.displayAvatarURL()

        const sent = await interaction.reply({
            content: "Calculando ping...",
            fetchReply: true
        })

        const messageLatency = sent.createdTimestamp - interaction.createdTimestamp
        const apiLatency = client.ws.ping

        const pingEmbed = new discord.EmbedBuilder()
            .setTitle("🏓 Pong!")
            .setDescription(`Olá ${interaction.user}, aqui estão os meus resultados:`)
            .addFields(
                {
                    name: "📡 Latência da API",
                    value: `\`${apiLatency}ms\``,
                    inline: true
                },
                {
                    name: "✉️ Latência de Mensagem",
                    value: `\`${messageLatency}ms\``,
                    inline: true
                }
            )
            .setColor("Blue")
            .setThumbnail(botAvatarUrl)
            .setFooter({
                text: `Solicitado por ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
            .setFooter({
                text: "By Marcuth",
                iconURL: "https://avatars.githubusercontent.com/u/91915075?v=4"
            })

        await interaction.editReply({
            content: null,
            embeds: [pingEmbed]
        })
    }
}

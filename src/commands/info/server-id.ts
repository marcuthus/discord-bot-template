import * as discord from "discord.js"

import { Command } from "../../interfaces/command"

export const command: Command = {
    name: "server-id",
    description: "Mostra o ID do servidor e do canal atuais.",
    type: discord.ApplicationCommandType.ChatInput,
    dmPermission: false,
    run: async (interaction) => {
        await interaction.reply(
            `Servidor **${interaction.guild?.name}**: \`${interaction.guildId}\`\nCanal: \`${interaction.channelId}\``
        )
    }
}

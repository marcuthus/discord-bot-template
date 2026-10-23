import * as discord from "discord.js"

import { Command } from "../../interfaces/command"

export const command: Command = {
    name: "user-id",
    description: "Mostra o seu ID ou o de outro usuário.",
    type: discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            type: discord.ApplicationCommandOptionType.User,
            description: "Usuário que terá o ID revelado (padrão: você).",
            required: false
        }
    ],
    run: async (interaction) => {
        const user = interaction.options.getUser("user") ?? interaction.user

        await interaction.reply({
            content: `O ID de **${user.username}** é \`${user.id}\``,
            allowedMentions: { parse: [] }
        })
    }
}

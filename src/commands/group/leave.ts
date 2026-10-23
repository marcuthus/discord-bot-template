import * as discord from "discord.js"

import { isBotOwnerId } from "../../utils/command/is-owner-id"
import { Command } from "../../interfaces/command"

export const command: Command = {
    name: "leave",
    description: "Faz o bot sair do servidor (requer gerenciar servidor).",
    type: discord.ApplicationCommandType.ChatInput,
    dmPermission: false,
    defaultMemberPermissions: discord.PermissionFlagsBits.ManageGuild,
    run: async (interaction) => {
        const canLeave =
            interaction.memberPermissions?.has(discord.PermissionFlagsBits.ManageGuild) ||
            isBotOwnerId(interaction.user.id)

        if (!canLeave) {
            await interaction.reply({
                content: `\`\`\`Permission Error:\n${interaction.user.username}, você não possui permissão para usar este comando.\`\`\``,
                ephemeral: true
            })
            return
        }

        await interaction.reply("Até mais! 👋")
        await interaction.guild!.leave()
    }
}

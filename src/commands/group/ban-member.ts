import * as discord from "discord.js"

import { isBotOwnerId } from "../../utils/command/is-owner-id"
import { Command } from "../../interfaces/command"

export const command: Command = {
    name: "ban-member",
    description: "Bane um membro do servidor (requer permissão de banir).",
    type: discord.ApplicationCommandType.ChatInput,
    dmPermission: false,
    defaultMemberPermissions: discord.PermissionFlagsBits.BanMembers,
    options: [
        {
            name: "user",
            type: discord.ApplicationCommandOptionType.User,
            description: "Usuário que será banido.",
            required: true
        },
        {
            name: "reason",
            type: discord.ApplicationCommandOptionType.String,
            description: "Motivo do banimento.",
            required: false
        }
    ],
    run: async (interaction) => {
        const canBan =
            interaction.memberPermissions?.has(discord.PermissionFlagsBits.BanMembers) ||
            isBotOwnerId(interaction.user.id)

        if (!canBan) {
            await interaction.reply({
                content: `\`\`\`Permission Error:\n${interaction.user.username}, você não possui permissão para usar este comando.\`\`\``,
                ephemeral: true
            })
            return
        }

        const user = interaction.options.getUser("user", true)
        const reason = interaction.options.getString("reason") ?? undefined

        if (user.id === interaction.user.id) {
            await interaction.reply({ content: "Você não pode banir a si mesmo.", ephemeral: true })
            return
        }

        try {
            await interaction.guild!.members.ban(user, { reason })
            await interaction.reply({
                content: `**${user.username}** (\`${user.id}\`) foi banido.${reason ? ` Motivo: ${reason}` : ""}`,
                allowedMentions: { parse: [] }
            })
        } catch (error) {
            await interaction.reply({
                content: `Não foi possível banir \`${user.id}\`. O bot precisa da permissão de banir e de um cargo acima do alvo. (${error})`,
                ephemeral: true
            })
        }
    }
}

import * as discord from "discord.js"

import { isBotOwnerId } from "../../utils/command/is-owner-id"
import { Command } from "../../interfaces/command"

const embedStautsColor = {
    idle: "Purple",
    online: "Green",
    invisible: "DarkGrey",
    dnd: "Red"
}

type EmbedStatusColors = keyof typeof embedStautsColor

const embedStautsEmoji = {
    idle: "🌙",
    online: "🟢",
    invisible: "⚫",
    dnd: "🔴"
}

export const command: Command = {
    name: "set-status",
    description: "Define um novo status e descrição para o bot.",
    options: [
        {
            name: "new-status",
            type: discord.ApplicationCommandOptionType.String,
            description: "Digite o novo status que você deseja que seja aplicado.",
            required: true,
            choices: [
                {
                    name: "Online",
                    value: discord.PresenceUpdateStatus.Online
                },
                {
                    name: "Ausente",
                    value: discord.PresenceUpdateStatus.Idle
                },
                {
                    name: "Não perturbar",
                    value: discord.PresenceUpdateStatus.DoNotDisturb
                },
                {
                    name: "Invisível",
                    value: discord.PresenceUpdateStatus.Invisible
                }
            ]
        },
        {
            name: "new-description",
            type: discord.ApplicationCommandOptionType.String,
            description: "Nova descrição a ser definida.",
            required: true
        }
    ],
    type: discord.ApplicationCommandType.ChatInput,
    // Comando só do dono: escondido de membros comuns e indisponível em DM
    dmPermission: false,
    defaultMemberPermissions: discord.PermissionFlagsBits.Administrator,
    run: async (interaction) => {
        const client = interaction.client

        if (!isBotOwnerId(interaction.user.id)) {
            await interaction.reply({
                content: `\`\`\`Permission Error:
${interaction.user.username}, você não possui permissão para usar este comando.\`\`\``,
                ephemeral: true
            })

            return
        }

        const botAvatarUrl = client.user.displayAvatarURL()

        const newStatus = interaction.options.get("new-status")?.value as EmbedStatusColors
        const newDescription = interaction.options.get("new-description")?.value as string

        const statusEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
            .setTitle("Novo status e descrição aplicados!")
            .setDescription(
                `
                ⎜
                ⎜➦ ${embedStautsEmoji[newStatus]} Novo Status: \`${newStatus}\`
                ⎜
                ⎜➦ 📋 Nova Descrição: \`${newDescription}\`
                ⎜
            `
            )
            .setColor(embedStautsColor[newStatus] as discord.ColorResolvable)

        await interaction.reply({ embeds: [statusEmbed], ephemeral: true })

        // Uma única chamada: setStatus + setPresence separados faziam o segundo sobrescrever o primeiro
        client.user.setPresence({
            status: newStatus as discord.PresenceStatusData,
            activities: [{ name: newDescription }]
        })
    }
}

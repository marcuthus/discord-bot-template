import * as discord from "discord.js"

import { isBotOwnerId } from "../../utils/command/is-owner-id"
import { Command } from "../../interfaces/command"

export const command: Command = {
    name: "invite",
    description: "Cria um link de convite para este servidor.",
    type: discord.ApplicationCommandType.ChatInput,
    dmPermission: false,
    defaultMemberPermissions: discord.PermissionFlagsBits.CreateInstantInvite,
    options: [
        {
            name: "max-age-hours",
            type: discord.ApplicationCommandOptionType.Integer,
            description: "Validade em horas (0 = não expira, padrão 24).",
            required: false,
            minValue: 0,
            maxValue: 168
        },
        {
            name: "max-uses",
            type: discord.ApplicationCommandOptionType.Integer,
            description: "Número máximo de usos (0 = ilimitado, padrão 0).",
            required: false,
            minValue: 0,
            maxValue: 100
        }
    ],
    run: async (interaction) => {
        const canInvite =
            interaction.memberPermissions?.has(discord.PermissionFlagsBits.CreateInstantInvite) ||
            isBotOwnerId(interaction.user.id)

        const channel = interaction.channel

        if (!canInvite) {
            await interaction.reply({ content: "Você não possui permissão para criar convites.", ephemeral: true })
            return
        }

        if (!channel || !("createInvite" in channel)) {
            await interaction.reply({ content: "Não é possível criar convites neste canal.", ephemeral: true })
            return
        }

        const maxAgeHours = interaction.options.getInteger("max-age-hours") ?? 24
        const maxUses = interaction.options.getInteger("max-uses") ?? 0

        try {
            const invite = await channel.createInvite({ maxAge: maxAgeHours * 3600, maxUses, unique: true })

            await interaction.reply(`Link de convite de **${interaction.guild?.name}**:\n${invite.url}`)
        } catch {
            await interaction.reply({
                content: "Não foi possível criar o convite. O bot precisa da permissão de criar convites.",
                ephemeral: true
            })
        }
    }
}

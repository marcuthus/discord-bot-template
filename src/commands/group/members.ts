import * as discord from "discord.js"

import { Command } from "../../interfaces/command"

const membersPerMessage = 25
const maxMembers = 100

export const command: Command = {
    name: "members",
    description: "Lista os membros do servidor e revela seus IDs.",
    type: discord.ApplicationCommandType.ChatInput,
    dmPermission: false,
    options: [
        {
            name: "limit",
            type: discord.ApplicationCommandOptionType.Integer,
            description: `Quantidade de membros a listar (máximo ${maxMembers}, padrão ${membersPerMessage}).`,
            required: false,
            minValue: 1,
            maxValue: maxMembers
        }
    ],
    run: async (interaction) => {
        const guild = interaction.guild!
        const limit = interaction.options.getInteger("limit") ?? membersPerMessage

        await interaction.deferReply()

        const members = await guild.members.list({ limit })
        const lines = members.map((member) => `\`${member.id}\` - ${discord.escapeMarkdown(member.displayName)}`)

        const embeds: discord.EmbedBuilder[] = []

        for (let start = 0; start < lines.length; start += membersPerMessage) {
            const embed = new discord.EmbedBuilder()
                .setDescription(lines.slice(start, start + membersPerMessage).join("\n"))
                .setColor("Blue")

            if (start === 0) embed.setTitle(`👥 ${guild.name} (${guild.memberCount} membros)`)

            embeds.push(embed)
        }

        await interaction.editReply({ embeds: embeds.slice(0, 1) })

        for (const embed of embeds.slice(1)) {
            await interaction.followUp({ embeds: [embed] })
        }
    }
}

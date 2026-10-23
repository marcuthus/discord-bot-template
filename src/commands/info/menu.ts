import * as discord from "discord.js"

import { Command } from "../../interfaces/command"
import { Client } from "../../client"

const categoryLabels: Record<string, string> = {
    info: "ℹ️ Informações",
    example: "🧪 Exemplos",
    group: "👥 Servidor",
    media: "🖼️ Mídia",
    admin: "🔐 Administração"
}

export const command: Command = {
    name: "menu",
    description: "Exibe o menu de comandos por categoria.",
    type: discord.ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const client = interaction.client as Client
        const groups = new Map<string, string[]>()

        for (const command of client.commands.values()) {
            const category = client.commandCategories.get(command.name) ?? "other"
            const lines = groups.get(category) ?? []

            lines.push(`• \`/${command.name}\` - ${command.description}`)
            groups.set(category, lines)
        }

        const menuEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
            .setTitle("📋 Menu")
            .setDescription(`Olá ${interaction.user}, estes são os meus comandos:`)
            .addFields(
                Array.from(groups.entries()).map(([category, lines]) => ({
                    name: categoryLabels[category] ?? category,
                    value: lines.join("\n")
                }))
            )
            .setColor("Blue")
            .setFooter({
                text: "By Marcuth",
                iconURL: "https://avatars.githubusercontent.com/u/91915075?v=4"
            })

        await interaction.reply({ embeds: [menuEmbed] })
    }
}

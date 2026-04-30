import { ExtendedInteraction } from "../interfaces/command"
import { createScopedLogger } from "../../utils/logger"
import { Event } from "../interfaces/event"
import { Client } from "../index"

const logger = createScopedLogger("client")

export const event: Event = {
    name: "interactionCreate",
    type: "on",
    run: async (interaction: ExtendedInteraction) => {
        if (interaction.isChatInputCommand()) {
            const client = interaction.client as Client
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                return await interaction.reply(`O commando \`/${interaction.commandName}\` não existe!`)
            }

            try {
                logger.info(`Running the command '${interaction.commandName}'.`)
                command.run(interaction)
            } catch (error) {
                logger.error(error)

                await interaction.reply({
                    content: `Ocorreu um erro ao tentar extecutar o comando \`${command.name}\`!`
                })
            }
        }
    }
}

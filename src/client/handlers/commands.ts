import path from "path"
import fs from "fs"

import * as discord from "discord.js"

import { createScopedLogger } from "../../utils/logger"
import { Command } from "../interfaces/command/index"
import { Client } from "../index"

const logger = createScopedLogger("client")

export default async (client: Client) => {
    const commandsDirPath = path.join(__dirname, "../commands")
    const fileExtension = path.extname(__filename)

    fs.readdirSync(commandsDirPath)
        .filter((dir) => fs.lstatSync(path.join(commandsDirPath, dir)).isDirectory())
        .forEach((dir) => {
            const subFolder = path.join(commandsDirPath, dir)

            fs.readdirSync(subFolder)
                .filter((file) => file.endsWith(fileExtension))
                .forEach(async (file) => {
                    const commandFilePath = path.join(subFolder, file)
                    const command = await importCommand(commandFilePath)

                    if (!command.name) {
                        logger.error(`Not valid commmand name on: ${commandFilePath}`)
                        throw new Error(`Not valid commmand name on: ${commandFilePath}`)
                    }

                    if (!command.run) {
                        logger.error(`Not valid command run on: ${commandFilePath}`)
                        throw new Error(`Not valid command run on: ${commandFilePath}`)
                    }

                    loadCommand(command)

                    function loadCommand(command: Command) {
                        const commandData: discord.ApplicationCommandDataResolvable = {
                            name: command.name,
                            description: command.description,
                            type: command.type,
                            options: command.options
                        }

                        client.commands.set(command.name, command)
                        client.slashCommands.push(commandData)

                        logger.info(`The command '${command.name}' loaded.`)
                    }
                })
        })

    async function importCommand(commandFilePath: string) {
        const command: Command = (await import(commandFilePath)).command
        return command
    }
}

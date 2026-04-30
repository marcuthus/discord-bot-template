import * as discord from "discord.js"

import { createScopedLogger } from "../utils/logger"

import { configHelper } from "./helpers/config.helper"
import { Command } from "./interfaces/command/index"
import handleCommands from "./handlers/commands"
import handleEvents from "./handlers/events"

const logger = createScopedLogger("client")

export class Client extends discord.Client {
    public commands: discord.Collection<string, Command> = new discord.Collection()
    public slashCommands: discord.ApplicationCommandDataResolvable[] = []
}

function createClient() {
    const token = configHelper.token

    const client = new Client({
        intents: [
            discord.GatewayIntentBits.Guilds,
            discord.GatewayIntentBits.DirectMessages,
            discord.GatewayIntentBits.MessageContent,
            discord.GatewayIntentBits.GuildMessages,
            discord.GatewayIntentBits.GuildMessageReactions
        ],
        partials: [discord.Partials.Channel]
    })

    client.commands = new discord.Collection()

    async function useEventsHandler() {
        await handleEvents(client)
    }

    async function useCommandsHandler() {
        await handleCommands(client)
    }

    async function deleteCommands() {
        logger.info("Deleting all commands.")

        const guilds = client.guilds.cache

        guilds.forEach(async (guild) => {
            const commands = await guild.commands.fetch()
            for (const command of commands.values()) {
                await command.delete()
            }
        })
    }

    async function start() {
        logger.info("Starting...")

        await deleteCommands()
        await useEventsHandler()
        await useCommandsHandler()
        await client.login(token)

        return await new Promise((resolve) => {
            client.on("ready", () => resolve(null))
        })
    }

    function stop() {
        logger.info("Stoping...")

        client.destroy()

        logger.info("Successfully stopped!")
    }

    async function restart() {
        stop()
        await start()
    }

    return { start, stop, restart }
}

export default createClient

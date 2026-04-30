import * as discord from "discord.js"

import handleCommands from "./handlers/commands"
import handleEvents from "./handlers/events"
import { bot } from "./helpers/config.helper"

import ICommand from "./interfaces/command/index"

export class Client extends discord.Client {
    public commands: discord.Collection<string, ICommand> = new discord.Collection()
    public slashCommands: discord.ApplicationCommandDataResolvable[] = []
}

function createClient() {
    const token = bot.token

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
        console.log("> [client] Deleting all commands.")

        const guilds = client.guilds.cache

        guilds.forEach(async (guild) => {
            const commands = await guild.commands.fetch()
            for (const command of commands.values()) {
                await command.delete()
            }
        })
    }

    async function start() {
        console.log("> [client] Starting...")

        await deleteCommands()
        await useEventsHandler()
        await useCommandsHandler()
        await client.login(token)

        return await new Promise((resolve, reject) => {
            client.on("ready", () => resolve(null))
        })
    }

    function stop() {
        console.log("> [client] Stoping...")

        client.destroy()

        console.log("> [client] Successfully stopped!")
    }

    async function restart() {
        stop()
        await start()
    }

    return { start, stop, restart }
}

export default createClient
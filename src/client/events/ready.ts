import { createScopedLogger } from "../../utils/logger"
import { Event } from "../interfaces/event/index"
import { Client } from "../index"

const logger = createScopedLogger("client")

export const event: Event = {
    name: "ready",
    type: "on",
    run: async (client: Client) => {
        logger.info(`Successfully started as '${client.user?.tag}'`)

        const guildsCache = client.guilds.cache

        const totalOfGuilds = client.guilds.cache.size

        let totalOfMembers: number = 0
        totalOfMembers = guildsCache.reduce((_, guild) => totalOfMembers + guild.memberCount)

        logger.info(`I'm on '${totalOfGuilds}' servers with '${totalOfMembers}' total members!`)

        await client.application?.commands.set(client.slashCommands)
    }
}

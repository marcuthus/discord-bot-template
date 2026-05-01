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

        const totalOfMembers = guildsCache.reduce((acc, guild) => acc + guild.memberCount, 0)

        logger.info(`I'm on '${totalOfGuilds}' servers with '${totalOfMembers}' total members!`)

        await client.application?.commands.set(client.slashCommands)

        logger.info("All slash commands synchronized with Discord!")
    }
}

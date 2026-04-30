import fs from "fs"

import { Client } from "../index"
import { bot } from "../helpers/config.helper"

import { ActivityType } from "discord.js"
import { IEvent } from "../interfaces/event/index"

function changeBotUsername(client: Client, newUsername: string) {
    client.user?.setUsername(newUsername)
}

function changeBotAvatar(client: Client, avatarFilePath: string) {
    const avatarBuffer = fs.readFileSync(avatarFilePath)
    client.user?.setAvatar(avatarBuffer)
}

export const event: IEvent = {
    name: "ready",
    type: "on",
    run: async (client: Client) => {
        console.log(`> [client] Successfully started as '${client.user?.tag}'`)

        const guildsCache = client.guilds.cache

        const totalOfGuilds = client.guilds.cache.size
        let totalOfMembers: number = 0
        totalOfMembers = guildsCache.reduce((accumulator, guild, key, collection) => totalOfMembers + guild.memberCount)

        console.log(`> [client] I'm on '${totalOfGuilds}' servers with '${totalOfMembers}' total members!`)

        await client.application?.commands.set(client.slashCommands)

        setInterval(() => {
            client.user?.setActivity({
                name: "Dragon City",
                type: ActivityType.Playing,
                url: "https://play.google.com/store/apps/details?id=es.socialpoint.DragonCity"
            })

            setTimeout(() => {
                client.user?.setPresence({
                    activities: [
                        {
                            name: bot.description,
                            type: ActivityType.Competing,
                            url: "https://dcmapas.com/"
                        }
                    ]
                })
            }, 25000)
        }, 55000)

        if (client.user?.username !== bot.name) {
            console.log(`- [X] > [client] Changing username from '${client.user?.username}' to '${bot.name}'.`)

            changeBotUsername(client, bot.name)
        }
    }
}
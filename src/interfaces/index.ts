import * as discord from "discord.js"

interface RegisterCommandOptions {
    guildId: string
    commands: discord.ApplicationCommandDataResolvable[]
}

export { RegisterCommandOptions }

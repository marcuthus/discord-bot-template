import * as discord from "discord.js"

export interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember
}

type RunFunc = (interaction: ExtendedInteraction) => Promise<void>

export interface Command extends discord.ChatInputApplicationCommandData {
    name: string
    description: string
    run: RunFunc
}

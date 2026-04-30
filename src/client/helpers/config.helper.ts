import { env } from "@marcuth/env"

export const configHelper = {
    commands: {
        prefix: "/",
        argumentsSeparator: " "
    },
    token: env("DISCORD_BOT_TOKEN"),
    admin: {
        id: env("DISCORD_ADMIN_ID")
    },
    application: {
        id: env("DISCORD_APPLICATION_ID"),
        publicKey: env("DISCORD_PUBLIC_KEY")
    }
}
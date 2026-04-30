import { bot } from "../../helpers/config.helper"

function isBotOwerId(id: string) {
    return id === bot.admin.id
}

export { isBotOwerId }
import { bot } from "../../helpers/config.helper"

function extractCommandAndOptions(messageContent: string) {
    if (!messageContent) return { command: "", options: [] }

    let [command, ...options] = messageContent
        .slice(bot.commands.prefix.length)
        .trim()
        .split(bot.commands.optionsSeparator)

    command = command.toLocaleLowerCase()
    options = parseOptions(options)

    return {
        command,
        options
    }

    function parseOptions(options: string[]) {
        options = options.map((option) => option.trim()).filter((option) => option !== "")

        return options
    }
}

export { extractCommandAndOptions }

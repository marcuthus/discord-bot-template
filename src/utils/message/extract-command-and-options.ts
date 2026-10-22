import { configHelper } from "../../helpers/config.helper"

export function extractCommandAndOptions(messageContent: string) {
    if (!messageContent) return { command: "", options: [] }

    let [command, ...options] = messageContent
        .slice(configHelper.commands.prefix.length)
        .trim()
        .split(configHelper.commands.argumentsSeparator)

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

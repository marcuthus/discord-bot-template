import path from "node:path"
import fs from "node:fs"

import { createScopedLogger } from "../../utils/logger"
import { Event } from "../interfaces/event"
import { Client } from "../index"

const logger = createScopedLogger("client")

export default async (client: Client) => {
    const eventsDirPath = path.join(__dirname, "../events")
    const fileExtension = path.extname(__filename)

    fs.readdirSync(eventsDirPath)
        .filter((file) => file.endsWith(fileExtension))
        .forEach(async (file) => {
            const eventFilePath = path.join(eventsDirPath, file)
            const event = await importEvent(eventFilePath)

            loadEvent(event)

            function loadEvent(event: Event) {
                switch (event.type) {
                    case "on":
                        client.on(event.name, (...args) => event.run(...args))
                        break
                    case "once":
                        client.once(event.name, (...args) => event.run(...args))
                        break
                    case "off":
                        client.off(event.name, (...args) => event.run(...args))
                        break
                    default:
                        logger.error(`The value '${event.type}' that informed for the type of the event is invalid.`, {
                            eventFilePath: eventFilePath
                        })
                        throw new Error(`The value '${event.type}' that informed for the type of the event is invalid.`)
                }

                logger.info(`The event '${event.name}' loaded.`, { eventFilePath: eventFilePath })
            }
        })

    async function importEvent(eventFilePath: string) {
        const event: Event = (await import(eventFilePath)).event
        return event
    }
}

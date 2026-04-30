import * as discord from "discord.js"

import { EventType } from "../../../enums"

type RunFunc = (...args: any[]) => void | Promise<any>
type EventNames = keyof discord.ClientEvents

export interface Event {
    name: EventNames
    type: EventType | `${EventType}`
    run: RunFunc
}

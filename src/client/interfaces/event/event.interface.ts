import * as discord from "discord.js"

import { EventType } from "../../../enums"

// Each event receives different arguments, so the run signature cannot be narrowed here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RunFunc = (...args: any[]) => Promise<void>
type EventNames = keyof discord.ClientEvents

export interface Event {
    name: EventNames
    type: EventType | `${EventType}`
    run: RunFunc
}

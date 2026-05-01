import { configHelper } from "../../helpers/config.helper"

export function isBotOwnerId(id: string) {
    return id === configHelper.admin.id
}

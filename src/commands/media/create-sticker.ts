import * as discord from "discord.js"
import sharp from "sharp"

import { isBotOwnerId } from "../../utils/command/is-owner-id"
import { Command } from "../../interfaces/command"

const stickerSize = 320
const maxStickerBytes = 512 * 1024
const maxImageBytes = 8 * 1024 * 1024

type Crop = "true" | "false" | "dented"

function createStickerTransform(crop: Crop, center: boolean) {
    const position = center ? "centre" : "left top"

    if (crop === "dented") {
        return sharp().resize(stickerSize, stickerSize, { fit: "fill" })
    }

    if (crop === "false") {
        return sharp().resize(stickerSize, stickerSize, {
            fit: "contain",
            position: position,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
    }

    return sharp().resize(stickerSize, stickerSize, { fit: "cover", position: position })
}

export async function createSticker(image: Buffer, crop: Crop, center: boolean) {
    return sharp(image)
        .ensureAlpha()
        .pipe(createStickerTransform(crop, center))
        .png({ compressionLevel: 9, palette: true })
        .toBuffer()
}

export const command: Command = {
    name: "create-sticker",
    description: "Cria uma figurinha do servidor a partir de uma imagem (requer gerenciar expressões).",
    type: discord.ApplicationCommandType.ChatInput,
    dmPermission: false,
    defaultMemberPermissions: discord.PermissionFlagsBits.ManageGuildExpressions,
    options: [
        {
            name: "image",
            type: discord.ApplicationCommandOptionType.Attachment,
            description: "Imagem que virará figurinha.",
            required: true
        },
        {
            name: "name",
            type: discord.ApplicationCommandOptionType.String,
            description: "Nome da figurinha (2 a 30 caracteres).",
            required: true,
            minLength: 2,
            maxLength: 30
        },
        {
            name: "tags",
            type: discord.ApplicationCommandOptionType.String,
            description: "Tags de busca da figurinha (padrão: o nome).",
            required: false,
            maxLength: 200
        },
        {
            name: "crop",
            type: discord.ApplicationCommandOptionType.String,
            description: "true (padrão): preenche e corta; false: imagem inteira; dented: amassada.",
            required: false,
            choices: [
                { name: "true (preenche e corta)", value: "true" },
                { name: "false (imagem inteira)", value: "false" },
                { name: "dented (amassada)", value: "dented" }
            ]
        },
        {
            name: "center",
            type: discord.ApplicationCommandOptionType.Boolean,
            description: "Centraliza o corte (padrão: sim). Não: alinha ao canto superior esquerdo.",
            required: false
        }
    ],
    run: async (interaction) => {
        const canCreate =
            interaction.memberPermissions?.has(discord.PermissionFlagsBits.ManageGuildExpressions) ||
            isBotOwnerId(interaction.user.id)

        if (!canCreate) {
            await interaction.reply({
                content: `\`\`\`Permission Error:\n${interaction.user.username}, você não possui permissão para usar este comando.\`\`\``,
                ephemeral: true
            })
            return
        }

        const attachment = interaction.options.getAttachment("image", true)
        const name = interaction.options.getString("name", true)
        const tags = interaction.options.getString("tags") ?? name
        const crop = (interaction.options.getString("crop") ?? "true") as Crop
        const center = interaction.options.getBoolean("center") ?? true

        if (!attachment.contentType?.startsWith("image/") || attachment.size > maxImageBytes) {
            await interaction.reply({ content: "Envie uma imagem de até 8 MB.", ephemeral: true })
            return
        }

        await interaction.deferReply()

        const original = Buffer.from(await (await fetch(attachment.url)).arrayBuffer())
        const png = await createSticker(original, crop, center)

        if (png.length > maxStickerBytes) {
            await interaction.editReply("A figurinha ficou maior que 512 KB. Tente uma imagem mais simples.")
            return
        }

        const sticker = await interaction.guild!.stickers.create({
            file: { attachment: png, name: "sticker.png" },
            name: name,
            tags: tags
        })

        await interaction.editReply(`Figurinha **${sticker.name}** criada! (\`${sticker.id}\`)`)
    }
}

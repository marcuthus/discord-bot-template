import winston from "winston"

const { combine, timestamp, printf, colorize } = winston.format

const logFormat = printf(({ level, message, timestamp, scope }) => {
    const scopeLabel = scope ? ` [${scope}]` : ""
    return `${timestamp}${scopeLabel} [${level}]: ${message}`
})

export const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), colorize(), logFormat),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    ]
})

export function createScopedLogger(scope: string) {
    return logger.child({ scope })
}

export default logger

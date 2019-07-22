import { createLogger, format, transports, Logger } from 'winston'
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const level = process.env.LOG_LEVEL || 'debug'

// Formatting Function Declaration
// @function: formatParams
// @params: info {}
// @return: formatted String
function formatParams(info :any): string {
    const { timestamp, level, message, ...args } = info
    const ts = timestamp.slice(0, 19).replace('T', ' ')

    return `${ts} ${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, null, "")
        : ""}`;
}

// Create An Instance of Development Format Option
const developmentFormat: any = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
)

// Create An Instance of Production Format Option
const productionFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
)

// A Winston.Logger Instance, Initially empty
let logger: Logger

// Checking Environment and Instantiate Production or Development Logger
if (process.env.NODE_ENV !== 'production') {
    logger = createLogger({
        level,
        format: developmentFormat,
        // format: format.json(),
        transports: [new transports.Console()]
    })
} else {
    logger = createLogger({
        level,
        format: productionFormat,
        transports: [
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
            new transports.File({ filename: 'logs/combined.log' })
        ]
    })
}

export default logger

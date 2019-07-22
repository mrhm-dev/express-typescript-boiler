import morgan from 'morgan'
import express from 'express';

const useMorgan = (app: express.Application): any => {
    // Log format string
    const format:string = process.env.NODE_ENV === 'production' ? 'combined' : 'dev' 

    // Log 400 and 500 Errors to Console as STDERR
    app.use(
        morgan(format, {
            skip: (req: express.Request, res: express.Response) => {
                return res.statusCode < 400
            },
            stream: process.stderr
        })
    )

    // Log 200 and 300 Request to Console as STDOUT
    app.use(
        morgan(format, {
            skip: (req: express.Request, res: express.Response) => {
                return res.statusCode >= 400
            },
            stream: process.stdout
        })
    )
}

export default useMorgan
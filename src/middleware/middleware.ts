import express from 'express'
import cors from 'cors'

import concat from 'lodash/concat'

const defaultMiddleware = [
    cors(),
    express.urlencoded({ extended: true }),
    express.json()
]

const productionMiddleware: Array<any> = []
const developmentMiddleware: Array<any> = []

function useMiddleware(app: express.Application) {
    let middleware: Array<any>
    if (process.env.NODE_ENV !== 'production') {
        middleware = concat(defaultMiddleware, developmentMiddleware)
    } else {
        middleware = concat(defaultMiddleware, productionMiddleware)
    }

    app.use(middleware)
}

export default useMiddleware
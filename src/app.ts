import express from "express";

import useMorgan from './logger/useMorgan'
import useMiddleware from './middleware/middleware'
import useRoutes from './routes/routes'


const app: express.Application = express();

// Using Morgan - Network Based Logging Middleware (Custom Function)
useMorgan(app)

// Using Middleware Function
useMiddleware(app)

// Using Routes Function
useRoutes(app)

app.get("/", (req: express.Request, res: express.Response) => {
    res.json({
        message: "Hello World"
    });
});

export default app;

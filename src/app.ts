import express, { Request, Response, NextFunction } from 'express';

import useMorgan from './logger/useMorgan';
import useMiddleware from './middleware/middleware';
import useRoutes from './routes/routes';

import Custom404Error from './errors/404';
import logger from './logger/logger';

const app: express.Application = express();

// Using Morgan - Network Based Logging Middleware (Custom Function)
useMorgan(app);

// Using Middleware Function
useMiddleware(app);

// Using Routes Function
useRoutes(app);

app.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'Hello World'
	});
});

// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new Custom404Error(404, '404 Page Not Found');
	next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof Custom404Error) {
		logger.error('404 Error');
		// Response to 404 Error
	} else {
		logger.error('500 Server Error');
		// Response to 500 Error
	}
});

export default app;

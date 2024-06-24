import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/NotFound';

const app:Application = express()


app.use(express.json());
app.use(cors())

app.get('/', (req:Request, res:Response) => {
  res.send('Server Is Running')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;
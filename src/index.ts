import express, { Request, Response } from 'express';
import { accountRouter } from './router/accounts';
import {json} from "body-parser";

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(json());
app.use('/accounts', accountRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
import express, { Request, Response } from 'express';
import { accountRouter } from './router/accounts';
import {json} from "body-parser";
import {cors} from "cors";

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(json());
app.use(cors());
app.use('/accounts', accountRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
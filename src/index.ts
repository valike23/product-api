import express, { Request, Response } from 'express';
import { accountRouter } from './router/accounts';
import {json} from "body-parser";
import cors from "cors";
import { productRouter } from './router/product';
import { settingsRouter } from './router/settings';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(json());
app.use('/accounts', accountRouter);
app.use('/products', productRouter);
app.use('/settings', settingsRouter);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
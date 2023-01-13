import * as express from 'express';
import { resolve } from 'path';
import { Request, Response } from "express";
import { routes } from './routes/gallery';
const app = express();
const PORT:number = 3000;
// set the server

app.get('/', (req:Request, res:Response):void => {
  res.send('Server working');
});
app.listen(PORT, () => {
  console.log("Running in :" + `http://localhost:${PORT}`);
});
// access assets to use
app.use('/assets', express.static(resolve(__dirname, '../assets')));
// route
app.use('/', routes);
// 404 error
app.get('*', function(req:Request, res:Response):void {
  res.status(404).send('404');
});
export default app;

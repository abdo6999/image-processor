import * as express from 'express';
import resize from '../utilities/resize';
import * as fs from 'fs';
import { resolve } from 'path';
import * as Handlebars from 'handlebars';
import { Request, Response } from "express";
import { Query } from 'express-serve-static-core';

import { getDir, getFile } from '../utilities/get';
const routes = express.Router();
// get needed data to gallery
// 1. path
const assets = {
  // to get all images or specific imeage
  images: (name = '') => resolve(__dirname, '../../assets/images', `${name}`),
  source: resolve(__dirname, '../../assets/client/index.html'),
  thumb: (name: string, width: number, height: number) =>
    resolve(
      __dirname,
      '../../assets',
      `thumb/${`${name
        .split('.')
        .slice(0, -1)
        .join('.')}_${width}x${height}.${name.substr(
        name.lastIndexOf('.') + 1
      )}`}`
    )
};
// 2. get images name to serve gallery
const images:object[] = getDir(assets.images());
const source:string = getFile(assets.source);
// lunch gallery
routes.get('/gallery', (req:Request, res:Response):void => {
  const template = Handlebars.compile(source);
  const data = { title: 'gallery', images: images };
  const result:string = template(data);
  res.status(200).send(result);
});
// image resize
routes.get('/gallery/images',  (req:TypedRequestQuery<{filename:string,width:string,height:string}>, res:Response):void => {
  const filename= req.query.filename 
  const width: number = parseInt(req.query.width ) as number;
  const height: number = parseInt(req.query.height ) as number;
  if (Number.isNaN(width) || width < 0) {
    res.status(418).send('enter valid width');
  } else if (Number.isNaN(height) || height < 0) {
    res.status(418).send('enter valid height');
  } else if (!fs.existsSync(assets.images(filename))) {
    res.status(418).send('enter valid filename');
  } else {
    if (fs.existsSync(assets.thumb(filename, width, height))) {
      res.status(200).sendFile(assets.thumb(filename, width, height));
    } else {
      resize(filename, width, height).then(() => {
        res.status(200).sendFile(assets.thumb(filename, width, height));
      });
    }
  }
});
export interface TypedRequestQuery<T extends Query> extends Express.Request {
     query: T
}
export { routes, assets, images };

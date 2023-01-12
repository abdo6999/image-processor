import * as express from 'express';
import resize from '../utilities/resize';
import * as fs from 'fs';
import { resolve } from 'path';
import * as Handlebars from 'handlebars';
import { getDir, getFile } from '../utilities/get';
const routes = express.Router();
// get needed data to gallery
// 1. path
const assets = {
  // to get all images or specific imeage
  images: (name = '') => resolve(__dirname, '../../assets/images', `${name}`),
  source: resolve(__dirname, '../../assets/client/index.html'),
  thumb: (name: string) => resolve(__dirname, '../../assets', `thumb/${name}`)
};
// 2. get images name to serve gallery
const images = getDir(assets.images());
const source = getFile(assets.source);
// lunch gallery
routes.get('/gallery', (req, res) => {
  const template = Handlebars.compile(source);
  const data = { title: 'gallery', images: images };
  const result = template(data);
  res.status(200).send(result);
});
// image resize
routes.get('/gallery/images', (req, res) => {
  const filename = (req.query.filename as unknown) as string;
  const width: number = parseInt(req.query.width as string) as number;
  const height: number = parseInt(req.query.height as string) as number;
  if (Number.isNaN(width)) {
    res.status(418).send('enter valid width');
  } else if (Number.isNaN(height)) {
    res.status(418).send('enter valid height');
  } else if (!fs.existsSync(assets.images(filename))) {
    res.status(418).send('enter valid filename');
  } else {
    resize(filename, width, height).then(() => {
      res.status(200).sendFile(
        assets.thumb(
          `${filename
            .split('.')
            .slice(0, -1)
            .join('.')}_${width}x${height}.${filename.substr(
            filename.lastIndexOf('.') + 1
          )}`
        )
      );
    });
  }
});
export { routes, assets, images };

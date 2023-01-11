import * as express from "express";
import resize from "../utilities/resize";
import * as Handlebars from "handlebars";
import * as fs from "fs";
import { resolve } from "path";
import { getDir, getFile } from "../utilities/get";
const routes = express.Router();
// get needed data to gallery
// 1. path
const assets = {
  // to get all images or specific imeage
  images: (name:string='')=>resolve(__dirname, "../../assets/images",`${name}`),
  sourse: resolve(__dirname, "../../assets/client/index.html"),
  thumb: (name:string)=>resolve(__dirname, "../../assets", `thumb/${name}`)
};
// 2. get images name to serve gallery
const images = getDir(assets.images());
// 3. get sourse file name to serve gallery html code
const sourse = getFile(assets.sourse);
// lunch gallery
routes.get("/gallery", (req, res) => {
  // use Handlebars to set the data in {{}}
  let template = Handlebars.compile(sourse);
  let data = { title: "gallery", images: images };
  let result = template(data);
  res.send(result);
});
// image resize
routes.get("/gallery/images", (req, res) => {
  const filename = req.query.filename as unknown as string;
  const width: number = parseInt(req.query.width as string) as number;
  const height: number = parseInt(req.query.height as string) as number;
  if (Number.isNaN(width)) {
    res.send("enter valid width");
  } else if(Number.isNaN(height)   ){
    res.send("enter valid height");
  }else if(!fs.existsSync(assets.images(filename))){
    res.send("enter valid filename");
  }else {
    resize(filename, width, height).then(() => {
      res.sendFile(assets.thumb(filename));
    });
  }
});
export  {routes,assets,images};

import * as express from "express";
import * as fs from "fs";
import Handlebars = require("handlebars");
import { resolve } from "path";
const routes = express.Router();
// get needed data to gallery
// 1. images path
const dir = resolve(__dirname, "../../../assets", "images");
let images: Array<object> = [];
fs.readdir(dir, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    images.push({ path: `./assets/images/${file}`});
  }
});
// sourse html code
let sourse: string;
fs.readFile(resolve(__dirname, "../../../assets", "client/index.html"), (err, data) => {
  if (err) throw new Error();
  sourse = data.toString();
});
// lunch gallery
routes.get("/gallery", (req, res) => {
  let template = Handlebars.compile(sourse);
  let data = { title: "gallery", images: images };
  let result = template(data);
  res.send(result);
});

export default routes;

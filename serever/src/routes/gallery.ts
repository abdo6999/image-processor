import * as express from "express";
import * as fs from "fs";
import * as request from "supertest";
import resize from "../utilities/resize";
import Handlebars = require("handlebars");
import { resolve } from "path";
import axios from "axios";
const routes = express.Router();
// get needed data to gallery
// 1. images path
const dir = resolve(__dirname, "../../../assets", "images");
let images: Array<object> = [];
fs.readdir(dir, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    images.push({ path: `./assets/images/${file}` });
  }
});
// sourse html code
let sourse: string;
fs.readFile(
  resolve(__dirname, "../../../assets", "client/index.html"),
  (err, data) => {
    if (err) throw new Error();
    sourse = data.toString();
  }
);
// lunch gallery
routes.get("/gallery", (req, res) => {
  let template = Handlebars.compile(sourse);
  let data = { title: "gallery", images: images };
  let result = template(data);
  res.send(result);
});
routes.get("/gallery/images", (req, res) => {
  const filename = req.query.filename as unknown as string;
  const width = parseInt(req.query.width as string) as number;
  const height = parseInt(req.query.height as string) as number;
  resize(filename, width, height).then(() => {
    res.sendFile(resolve(__dirname, "../../../assets", `thumb/${filename}`));
  });
});

export default routes;

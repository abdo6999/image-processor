"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = exports.assets = exports.routes = void 0;
const express = require("express");
const resize_1 = require("../utilities/resize");
const Handlebars = require("handlebars");
const fs = require("fs");
const path_1 = require("path");
const get_1 = require("../utilities/get");
const routes = express.Router();
exports.routes = routes;
// get needed data to gallery
// 1. path
const assets = {
    // to get all images or specific imeage
    images: (name = '') => (0, path_1.resolve)(__dirname, "../../assets/images", `${name}`),
    sourse: (0, path_1.resolve)(__dirname, "../../assets/client/index.html"),
    thumb: (name) => (0, path_1.resolve)(__dirname, "../../assets", `thumb/${name}`)
};
exports.assets = assets;
// 2. get images name to serve gallery
const images = (0, get_1.getDir)(assets.images());
exports.images = images;
// 3. get sourse file name to serve gallery html code
const sourse = (0, get_1.getFile)(assets.sourse);
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
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (Number.isNaN(width)) {
        res.send("enter valid width");
    }
    else if (Number.isNaN(height)) {
        res.send("enter valid height");
    }
    else if (!fs.existsSync(assets.images(filename))) {
        res.send("enter valid filename");
    }
    else {
        (0, resize_1.default)(filename, width, height).then(() => {
            res.sendFile(assets.thumb(filename));
        });
    }
});

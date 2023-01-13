"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = exports.assets = exports.routes = void 0;
const express = require("express");
const resize_1 = require("../utilities/resize");
const fs = require("fs");
const path_1 = require("path");
const Handlebars = require("handlebars");
const get_1 = require("../utilities/get");
const routes = express.Router();
exports.routes = routes;
// get needed data to gallery
// 1. path
const assets = {
    // to get all images or specific imeage
    images: (name = '') => (0, path_1.resolve)(__dirname, '../../assets/images', `${name}`),
    source: (0, path_1.resolve)(__dirname, '../../assets/client/index.html'),
    thumb: (name, width, height) => (0, path_1.resolve)(__dirname, '../../assets', `thumb/${`${name
        .split('.')
        .slice(0, -1)
        .join('.')}_${width}x${height}.${name.substr(name.lastIndexOf('.') + 1)}`}`)
};
exports.assets = assets;
// 2. get images name to serve gallery
const images = (0, get_1.getDir)(assets.images());
exports.images = images;
const source = (0, get_1.getFile)(assets.source);
// lunch gallery
routes.get('/gallery', (req, res) => {
    const template = Handlebars.compile(source);
    const data = { title: 'gallery', images: images };
    const result = template(data);
    res.status(200).send(result);
});
// image resize
routes.get('/gallery/images', (req, res) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (Number.isNaN(width) || width < 0) {
        res.status(418).send('enter valid width');
    }
    else if (Number.isNaN(height) || height < 0) {
        res.status(418).send('enter valid height');
    }
    else if (!fs.existsSync(assets.images(filename))) {
        res.status(418).send('enter valid filename');
    }
    else {
        if (fs.existsSync(assets.thumb(filename, width, height))) {
            res.status(200).sendFile(assets.thumb(filename, width, height));
        }
        else {
            (0, resize_1.default)(filename, width, height).then(() => {
                res.status(200).sendFile(assets.thumb(filename, width, height));
            });
        }
    }
});

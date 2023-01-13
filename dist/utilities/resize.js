"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
const gallery_1 = require("../routes/gallery");
function resize(name, width, height) {
    const input = gallery_1.assets.images(name);
    const ouput = gallery_1.assets.thumb(name, width, height);
    return sharp(input)
        .resize(width, height)
        .toFile(ouput);
}
exports.default = resize;

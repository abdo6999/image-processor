"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
const path_1 = require("path");
function resize(name, width, height) {
    const input = (0, path_1.resolve)(__dirname, "../../assets", `images/${name}`);
    const ouput = (0, path_1.resolve)(__dirname, "../../assets", `thumb/${name}`);
    return sharp(input).resize(width, height).toFile(ouput);
}
exports.default = resize;

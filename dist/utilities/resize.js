"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
const path_1 = require("path");
function resize(name, width, height) {
    const input = (0, path_1.resolve)(__dirname, "../../assets", `images/${name}`);
    const ouput = (0, path_1.resolve)(__dirname, "../../assets", `thumb/${name
        .split(".")
        .slice(0, -1)
        .join(".")}_${width}x${height}.${name.substring(name.lastIndexOf(".") + 1)}`);
    return sharp(input).resize(width, height).toFile(ouput);
}
exports.default = resize;

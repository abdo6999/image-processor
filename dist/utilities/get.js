"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDir = exports.getFile = void 0;
const fs = require("fs");
function getFile(filePath) {
    const sourse = fs.readFileSync(filePath, "utf-8");
    return sourse;
}
exports.getFile = getFile;
function getDir(DirPath) {
    let images = fs.readdirSync(DirPath);
    for (let i = 0; i < images.length; i++) {
        images[i] = { path: `/assets/images/${images[i]}` };
    }
    return images;
}
exports.getDir = getDir;

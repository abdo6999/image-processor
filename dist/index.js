"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = require("path");
const gallery_1 = require("./routes/gallery");
const app = express();
const PORT = 3000;
// set the server
app.get("/", (req, res) => {
    res.send("Server working");
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
// access assets to use
app.use("/assets", express.static((0, path_1.resolve)(__dirname, "../assets")));
// route
app.use("/", gallery_1.routes);
// 404 error
app.get("*", function (req, res) {
    res.status(404).send("404");
});
exports.default = app;

import * as express from "express";
import { resolve } from "path";
import {routes} from "./routes/gallery";
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
app.use("/assets", express.static(resolve(__dirname, "../assets")));
// route
app.use("/", routes);
// 404 error
app.get("*", function (req, res) {
  res.status(404).send("404");
});
export default app;
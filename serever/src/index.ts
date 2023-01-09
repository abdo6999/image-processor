import * as express from "express";
import { resolve } from "path";
import routes from "./routes/gallery";
const app = express();
const PORT = 3000;
// set the server
app.get("/", (req, res) => {
  res.send("working");
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
// access assets to use
app.use("/assets", express.static(resolve(__dirname, "../../assets")));
app.use("/", routes);

import * as sharp from "sharp";
import { resolve } from "path";
function resize(name: string, width: number, height: number) {
  const input = resolve(__dirname, "../../assets", `images/${name}`);
  const ouput = resolve(__dirname, "../../assets", `thumb/${name}`);
  return sharp(input).resize(width, height).toFile(ouput);
}

export default resize;

import * as sharp from 'sharp';
import { assets } from "../routes/gallery";
function resize(name: string, width: number, height: number):Promise<sharp.OutputInfo> {
  const input = assets.images(name);
  const ouput = assets.thumb(name,width,height)
  return sharp(input)
    .resize(width, height)
    .toFile(ouput);
}

export default resize;

import * as fs from "fs";
function getFile(filePath: string) {
  const sourse: string = fs.readFileSync(filePath, "utf-8");
  return sourse;
}
function getDir(DirPath: string) {
  let images: Array<string | object> = fs.readdirSync(DirPath);
  for (let i = 0; i < images.length; i++) {
    images[i] = { path: `http://localhost:3000/assets/images/${images[i]}` };
  }
  return images;
}
export { getFile, getDir };

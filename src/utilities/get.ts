import * as fs from 'fs';
function getFile(filePath: string):string {
  const sourse: string = fs.readFileSync(filePath, 'utf-8');
  return sourse;
}
function getDir(DirPath: string):Array<object> {
  const images: Array<string | object> = fs.readdirSync(DirPath);
  for (let i = 0; i < images.length; i++) {
    images[i] = { path: `/assets/images/${images[i]}` };
  }
  return images as Array<object>;
}
export { getFile, getDir };

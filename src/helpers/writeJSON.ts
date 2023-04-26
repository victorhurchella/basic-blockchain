import fs from 'fs';
import path from 'path';

export function writeJSON(name: string, data: any): void {
  const filePath = path.join(__dirname, `../../${name}.json`);
  const json = JSON.stringify(data, null, 2);

  fs.writeFile(filePath, json, (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Blockchain succesfully builded`);
  });
}

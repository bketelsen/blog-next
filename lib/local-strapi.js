import fs from 'fs'
import path from 'path'


const root = process.cwd()

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
export function sortOn (arr, prop) {
  arr.sort (
      function (a, b) {
          if (a[prop] < b[prop]){
              return -1;
          } else if (a[prop] > b[prop]){
              return 1;
          } else {
              return 0;   
          }
      }
  );
}

export async function getFile(name) {
  const content = fs.readFileSync(path.join(root, 'data', name),'utf-8')
  const parsed = JSON.parse(content)
  return parsed
}

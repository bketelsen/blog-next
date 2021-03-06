import fs from 'fs'
import matter from 'gray-matter'
import visit from 'unist-util-visit'
import path from 'path'
import readingTime from 'reading-time'

import imgToJsx from './img-to-jsx'

const root = process.cwd()

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFile(name) {
  const content = fs.readFileSync(path.join(root, 'data', name),'utf-8')
  const parsed = JSON.parse(content)
  return parsed.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
}

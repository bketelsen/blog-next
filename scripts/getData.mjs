import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';
const streamPipeline = promisify(pipeline);


async function getData(name, path) {
    const response = await fetch(`https://content.brian.dev${name}`);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    await streamPipeline(response.body, createWriteStream(path));
}
export default getData
import fetch from 'node-fetch';
import fs from 'fs';
import getData from './getData.mjs';

await getData("/articles", "data/articles.json")
await getData("/categories", "data/categories.json")
await getData("/global", "data/global.json")
await getData("/writers", "data/writers.json")
await getData("/tags", "data/tags.json")


// save all the images from the cms to local public directory
fs.readFile("data/articles.json", function (err, data) {

  // Check for errors 
  if (err) throw err;

  // Converting to JSON 
  const articles = JSON.parse(data);
  articles.forEach(article => {
    getData(article.image.url, `./public${article.image.url}`)
  })

});
fs.readFile("data/writers.json", function (err, data) {

  // Check for errors 
  if (err) throw err;

  // Converting to JSON 
  const writers = JSON.parse(data);
  writers.forEach(writer => {
    getData(writer.picture.url, `./public${writer.picture.url}`)
  })

});



/*

import writers from '../data/writers.json';

writers.forEach(writer => {
    console.log("fetching image: ",writer.picture.url)
    var url = `https://content.brian.dev${writer.picture.url}`
    https.request(url, function(response) {
      var data = new Stream();

      response.on('data', function(chunk) {
        data.push(chunk);
      });

      response.on('end', function() {
        fs.writeFileSync(`./public${writer.picture.url}`, data.read());
      });
    }).end();
});
*/
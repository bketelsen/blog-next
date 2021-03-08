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
    getData(article.seo.shareImage.url, `./public${article.seo.shareImage.url}`)
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

fs.readFile("data/global.json", function (err, data) {

  // Check for errors 
  if (err) throw err;

  // Converting to JSON 
  const global = JSON.parse(data);

  getData(global.defaultSeo.shareImage.url, `./public${global.defaultSeo.shareImage.url}`)


});

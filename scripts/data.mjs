import fs from 'fs';
import getData from './getData.mjs';
import path from 'path';
import yaml from 'js-yaml';

await getData("/articles", "data/articles.json")
await getData("/categories", "data/categories.json")
await getData("/global", "data/global.json")
await getData("/writers", "data/writers.json")
await getData("/tags", "data/tags.json")


// get mdx configuration from next-mdx.json so we know 
// where to put files by type
const configData = fs.readFileSync('next-mdx.json', "utf-8");
const mdxConfig = JSON.parse(configData);
console.log(mdxConfig["page"])

// persist article and its images
fs.readFile("data/articles.json", function (err, data) {
  // Check for errors 
  if (err) throw err;
  // Converting to JSON 
  const articles = JSON.parse(data);
  articles.forEach(article => {
    saveArticle(article, mdxConfig)
  })

});
fs.readFile("data/writers.json", function (err, data) {
  // Check for errors 
  if (err) throw err;
  // Converting to JSON 
  const writers = JSON.parse(data);
  writers.forEach(writer => {
    saveWriter(writer, mdxConfig)
  })

});
fs.readFile("data/categories.json", function (err, data) {
  // Check for errors 
  if (err) throw err;
  // Converting to JSON 
  const categories = JSON.parse(data);
  categories.forEach(category => {
    saveCategory(category, mdxConfig)
  })

});
fs.readFile("data/global.json", function (err, data) {
  // Check for errors 
  if (err) throw err;
  // Converting to JSON 
  const global = JSON.parse(data);
  getData(global.defaultSeo.shareImage.url, `./public${global.defaultSeo.shareImage.url}`)
});


function saveImage(image, config) {
  const imageConfig = config["image"];
  const fileName = path.join(imageConfig.contentPath, image.hash + ".mdx")

  getData(image.url, `./public${image.url}`)

  Object.keys(image.formats).forEach(function (i) {
    if (i === 'base64') {
      const b6 = {
        url: image.formats[i].url,
        width: image.formats[i].width,
        height: image.formats[i].height
      }
      image.base64 = b6;

    } else {
      image.formats[i].forEach(function (f) {
        getData(f.url, `./public${f.url}`)
      })
    }
  })
  // create the target directory if it doesn't exist 
  if (!fs.existsSync(imageConfig.contentPath)) {
    fs.mkdirSync(imageConfig.contentPath);
  }
  // write the contents
  fs.writeFileSync(fileName, '---\n' + yaml.dump(image) + '---\n');
}


function saveArticle(article, config) {
  console.log("converting article", article.slug)

  const contents = (article) => `
---
title: ${yaml.dump(article.title).trimEnd()}
excerpt: ${yaml.dump(article.description).trimEnd()}
image: 
  ${yaml.dump([article.image.hash]).trimEnd()}
published_at: ${yaml.dump(article.publishedAt).trimEnd()}
updated_at: ${yaml.dump(article.updated_at).trimEnd()}
status: ${yaml.dump(article.status).trimEnd()}
featured: false
category: 
  ${yaml.dump([article.category.slug]).trimEnd()}
author: 
  ${yaml.dump([article.author.slug]).trimEnd()}
seo:
  metaTitle: ${yaml.dump(article.seo.metaTitle).trimEnd()}
  metaDescription: ${yaml.dump(article.seo.metaDescription).trimEnd()}
  shareImage: 
    ${yaml.dump([article.seo.shareImage.hash]).trimEnd()}
tags:
  ${article.tags.length ? yaml.dump(article.tags.map((t) => t.slug)).trimEnd() : ``}
---

${article.content}
  `
  const articleConfig = config[article.category.slug];
  const fileName = path.join(articleConfig.contentPath, article.slug + ".mdx")
  // create the target directory if it doesn't exist 
  if (!fs.existsSync(articleConfig.contentPath)) {
    fs.mkdirSync(articleConfig.contentPath);
  }
  // write the contents
  fs.writeFileSync(fileName, contents(article).trim());
  saveImage(article.image, config)
  saveImage(article.seo.shareImage, config)
}
function saveWriter(writer, config) {
  console.log("converting writer", writer.slug)

  const contents = (writer) => `
---
name: ${yaml.dump(writer.name).trimEnd()}
bio: ${yaml.dump(writer.bio).trimEnd()}
email: ${yaml.dump(writer.email).trimEnd()}
twitter: ${yaml.dump(writer.twitter).trimEnd()}
youtube: ${yaml.dump(writer.youtube).trimEnd()}
github: ${yaml.dump(writer.github).trimEnd()}
linkedin: ${yaml.dump(writer.linkedin).trimEnd()}
jobtitle: ${yaml.dump(writer.jobtitle).trimEnd()}
company: ${yaml.dump(writer.company).trimEnd()}
picture: 
  ${yaml.dump([writer.picture.hash]).trimEnd()}
avatar: 
  ${yaml.dump([writer.avatar.hash]).trimEnd()}
---`
  const writerConfig = config["author"];
  const fileName = path.join(writerConfig.contentPath, writer.slug + ".mdx")
  // create the target directory if it doesn't exist 
  if (!fs.existsSync(writerConfig.contentPath)) {
    fs.mkdirSync(articleConfig.contentPath);
  }
  // write the contents
  fs.writeFileSync(fileName, contents(writer).trim());
  saveImage(writer.picture, config)
  saveImage(writer.avatar, config)
}


function saveCategory(category, config) {
  console.log("converting category", category.slug)

  const contents = (category) => `
---
name: ${yaml.dump(category.name).trimEnd()}
plural: ${yaml.dump(category.plural).trimEnd()}
---`
  const categoryConfig = config["category"];
  const fileName = path.join(categoryConfig.contentPath, category.slug + ".mdx")
  // create the target directory if it doesn't exist 
  if (!fs.existsSync(categoryConfig.contentPath)) {
    fs.mkdirSync(categoryConfig.contentPath);
  }
  // write the contents
  fs.writeFileSync(fileName, contents(category).trim());
}
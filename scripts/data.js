const fs = require('fs')
const fetch = require('node-fetch');


var https = require('https'),                                                
    Stream = require('stream').Transform                                  


const getContent = (type, path) => {
    fetch(`https://content.brian.dev/${type}`)
        .then(res => res.json())
        .then(json => {
            try {
                fs.writeFileSync(path, JSON.stringify(json))
            } catch (err) {
                console.error(err)
            }
        })

}
const fetchImage = (path) => {

}

getContent("articles", "data/articles.json")
getContent("categories", "data/categories.json")
getContent("global", "data/global.json")
getContent("homepage", "data/homepage.json")
const articles = require('../data/articles.json');





articles.forEach(article => {

    console.log(article.image.url)
    var url = `https://content.brian.dev${article.image.url}`
    https.request(url, function(response) {                                        
      var data = new Stream();                                                    
    
      response.on('data', function(chunk) {                                       
        data.push(chunk);                                                         
      });                                                                         
    
      response.on('end', function() {                                             
        fs.writeFileSync(`./public${article.image.url}`, data.read());                               
      });                                                                         
    }).end();
});
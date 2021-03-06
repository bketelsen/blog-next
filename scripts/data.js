const fs = require('fs')
const fetch = require('node-fetch');

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


getContent("articles","data/articles.json")
getContent("categories","data/categories.json")
getContent("global","data/global.json")
getContent("homepage","data/homepage.json")
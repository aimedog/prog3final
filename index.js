var scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');

var file = 'data.json';

scrapeIt("http://list.am", {
    title: ".header h1"
  , desc: ".header h2"
  , avatar: {
        selector: ".header img"
      , attr: "src"
    }
    
}).then(function(page)
{
    jsonfile.writeFile(file, page, {spaces: 2}, function(err)
    {
        console.error(err);
    })
});
scrapeIt("http://ionicabizau.net", {
    articles: {
        listItem: ".article"
      , data: {
            createdAt: {
                selector: ".date"
              , convert: x => new Date(x)
            }
          , title: "a.article-title"
          , tags: {
                listItem: ".tags > span"
            }
          , content: {
                selector: ".article-content"
              , how: "html"
            }
        }
    }
  , pages: {
        listItem: "li.page"
      , name: "pages"
      , data: {
            title: "a"
          , url: {
                selector: "a"
              , attr: "href"
            }
        }
    }
  , title: ".header h1"
  , desc: ".header h2"
  , avatar: {
        selector: ".header img"
      , attr: "src"
    }
}, (err, page) => {
    jsonfile.writeFile(file, page, { flag: 'a', spaces: 2}, function(err)
    {
        console.error(err);
    })
});
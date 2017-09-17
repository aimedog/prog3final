var scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');

var file = 'data.json';

scrapeIt("http://list.am/category/62", {
    prices: ".l2 .l"
  , homes: ".h .l"
}).then(function(page)
{
    jsonfile.writeFile(file, page, {flag:'a', spaces: 2}, function(err)
    {
        console.error(err);
    })
});
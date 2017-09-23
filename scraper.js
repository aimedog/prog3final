var scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');
var fs = require("fs");

var file = 'data.json';

var urlfile = 'urlfile.json';

scrapeIt("http://list.am/category/62", {
    houses: {
        listItem: "#contentr > div.dl > div.gl > a",
        data: {
            title: "div:nth-child(2)",
            url: {
                closest: "a",
                attr: "href"
            }
        }
    }
}).then(function(page)
{
    jsonfile.writeFile(urlfile, page, {spaces: 2}, function(err)
    {
        console.error(err);
    })
}).then(fs.readFile('urlfile.json','utf8',
    function(err, data)
    {
        if(!err)
        {
            console.log("Worked!");
        }
        var data = JSON.parse(data);
        for(i = 0;i < data.houses.length;i++)
        {
            scrapeIt("http://list.am" + data.houses[i].url, {
                houses: {
                    listItem: "#pcontent",
                    data: {
                        name: ".vih > h1",
                        attributes: ".t,.i",
                        price: ".price",
                        location: ".loc",
                        helping: ".footer"
                    }
                }
            }).then(function(page)
            {
                jsonfile.writeFile(file, page, {flag: "a", spaces: 2}, function(err)
                {
                    console.error(err);
                });
            })
        }
    }
));
var scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');
var fs = require("fs");

var file = 'data.json'

var datax = { "houses": [] };
var urlfile = 'urlfile.json'

function scraper_list(page_number) {
    scrapeIt("http://list.am/category/62/" + page_number, {
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
    }).then(function (page) {
        datax.houses.push(...page.houses);
        console.log('datax: ' + datax.houses.length);
        if (page_number == 2) {
            jsonfile.writeFile(urlfile, datax, { spaces: 2 }, scraper_houses);
        } else {
            setTimeout(
                () => {
                    page_number++;
                    console.log(page_number);
                    scraper_list(page_number);
                }, 3000
            );
        }
    })
}

scraper_list(1);

function cb(err){
    console.log('Test' + err)
}


function scraper_houses(err) {
    console.error(err);
    fs.readFile(urlfile, 'utf8',
        function (err, data) {
            if (!err) {
                console.log("Worked!");
            }
            var data = JSON.parse(data);
            for (i = 0; i < data.houses.length-1; i++) {
                console.log("http://list.am" + data.houses[i].url);
                setTimeout(() => {
                    scrapeIt("http://list.am" + data.houses[i].url, {
                        houses: {
                            listItem: "#pcontent",
                            data: {
                                name: ".vih > h1",
                                type: ".c:nth-child(1) > .i",
                                rooms: ".c:nth-child(2) > .i",
                                square: ".c:nth-child(3) > .i",
                                price: ".price",
                                location: ".loc",
                                helping: ".footer"
                            }
                        }
                    }).then(function (page) {
                        jsonfile.writeFile(file, page, { flag: "a" }, function (err) {
                            if (!err) console.error(err);
                            
                        });
                    })
                }, 3000 * i);
            }
        }
    )
};
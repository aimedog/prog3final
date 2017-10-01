var scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');
var fs = require("fs");

var file = 'data.json';

var datax = { "houses": [] };
var urlfile = 'urlfile.json';
var datay = { "houses": [] };
var url_data;

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
        if (page_number == 2) {
            jsonfile.writeFile(urlfile, datax, { spaces: 2 }, function () {
                // starting scraper for houses
                start()
            });
        } else {
            setTimeout(
                () => {
                    page_number++;
                    scraper_list(page_number);
                }, 3000
            );
        }
    })
}

function start() {
    fs.readFile(urlfile, 'utf8', function (err, data) {
        if (err) throw err;
        url_data = JSON.parse(data);
        scraper_houses(85)
    })
};

function scraper_houses(i) {
    scrapeIt("http://list.am" + url_data.houses[i].url, {
        houses: {
            listItem: "#pcontent",
            data: {
                name: ".vih > h1",
                type: ".c:nth-child(1) > .i",
                rooms: ".c:nth-child(2) > .i",
                square: ".c:nth-child(3) > .i",
                price: {
                    selector: ".price",
                    convert: function (x) {
                        var re = /$ (.*)/i;
                        if (re.test(x)) {
                            var found = x.match(re);
                            console.log(found[1]);
                            return found[1];
                        } else {
                            return "";
                        }
                    }
                },
                location: ".loc"
            }
        }
    }).then(function (page) {
        datay.houses.push(...page.houses);
        setTimeout(
            () => {
                console.log(i);
                i = i + 1;
                if (i < url_data.houses.length) {
                    scraper_houses(i);
                    if (i % 2 == 0) setTimeout(function () {
                        console.log('Waiting for 5 minutes');
                    }, 5000)
                } else {
                    jsonfile.writeFile(file, datay, { spaces: 2 });
                }
            }, 3000);
    })
}
//starting scraper
//scraper_list(1);
start();
var request     = require('request');
var cheerio     = require('cheerio');
var fs          = require('fs');
const readline = require('readline');

//Date Y-m-d
var import_until = "2017-10-01";
var link = "http://www.afpbarcelos.pt/noticias";
var running = true;
var page = 1;
max_page = 40;

var csv_data = "";
var post_date = Date.now.toString();

console.post_date;

for (var i = 0; i < max_page; i++) {
    
    console.log("Waining for: " + link + "?page=" + page);

    request(link + "?page=" + page, function(error, response, body) {

        if(error)
            console.log('Error: ' + error);

        console.log("Loading DOM...");
    
        var $ = cheerio.load(body);

        $('.container .row div .list-group').each(function(){

        });

    });

    page++;

    sleep(3000);

    if (page > max_page)
        running = false;

}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }
//Only for league games
var request     = require('request');
var cheerio     = require('cheerio');
var fs          = require('fs');

var link = "http://www.afpbarcelos.pt/historyCalendario/1/1";

console.log("Starting BOT...");

console.log("Wainting for " + link);

var csv_data = "";
var match = {};
var round_obj = [{}];
var data = [{}];

request(link, function(error, response, body) {

    if(error)
        console.log('Error: ' + error);

    console.log("Reading DOM...");

    var $ = cheerio.load(body);

    $('.carousel-inner .item').each(function(){

        var round_element = $(this).find('.panel-heading');
        var round = round_element.text().trim();
        round = round.match('[0-9]+').toString();
        var game_count = 0;

        $(this).find('.table tbody tr').each(function() {
            
            game_count++;
            var td_number = 0;

            $(this).find('td').each(function() {

                td_number++;
                
                if (td_number == 2) {
                    match.home_team = $(this).text().trim();
                }

                if (td_number == 4) {
                    match.away_team = $(this).text().trim();
                }

                if (td_number == 3) {
                    
                    var score = $(this).text().trim();
                    var splited = score.split(" - ");

                    if (splited[0] == undefined || splited[1] == undefined) {

                        match.home_score = 0;
                        match.away_score = 0;

                    } else {

                        match.home_score = splited[0];
                        match.away_score = splited[1];

                    }

                }

                if (td_number == 6) {

                    var date = $(this).find('.data-jogos').text().trim();

                    var day = date.match("^[0-9]{2}\/").toString();
                    var month = date.match("\/[0-9]{2}\/").toString();
                    var year = date.match("\/[0-9]{4}").toString();

                    var hour = date.match("[0-9]{2}\:").toString();
                    var minute = date.match("\:[0-9]{2}").toString();

                    day = day.replace('/', '');
                    month = month.replace('/', '');
                    month = month.replace('/', '');
                    year = year.replace('/', '');

                    hour = hour.replace(':', '');
                    minute = minute.replace(':', '');
                    
                    match.compete_date = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00";

                }

            });

            //          Round;        Date;                      HomeTeam;               HomeScore;               AwayTeam;               AwayScore;               CupTie;       GroupTable
            csv_data += round + ";" + match.compete_date + ";" + match.home_team + ";" + match.home_score + ";" + match.away_team + ";" + match.away_score + ";" + false + ";" + null + "\n";

        });

    });

    console.log("Done!");
    console.log("Writting File...");

    var tmp = link.replace(/http\:\/\/[a-z0-9]+\.[a-z0-9]+\.[a-z]+/g, "");
    tmp = tmp.replace(/\//gi, "_");

    var filename = "outputs/output" + tmp + ".csv";

    fs.writeFile(filename, csv_data, 'utf8', function(error) {

        if (error)
            console.log("Error writing file!");

    });

    console.log("Finished");

});


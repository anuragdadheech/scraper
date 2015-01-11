/* global require */
"use strict";
var request = require("request");
var cheerio = require("cheerio");

var pools = {
    "Aloha": 3,
    "Beaverton": 15,
    "Conestoga": 12,
    "Harman": 11,
    "Raleigh": 6,
    "Somerset": 22,
    "Sunset": 5,
    "Tualatin Hills": 2
};
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

for (var pool in pools) {
    var url = "http://www.thprd.org/schedules/schedule.cfm?cs_id=" + pools[pool];
    request(url, (function(pool){ 
        return function(err, resp, body) {
            if (err)
                throw err;
            var $ = cheerio.load(body);
            $("#calendar .days td").each(function(day) {
                $(this).find("div").each(function() {
                    console.log(pool + "," + days[day] + "," + $(this).text().trim().replace(/\s\s+/g, ","));
                });
            });
            // TODO: scraping goes here!
        };

    })(pool));
}

var findInFiles = require("./find-in-files");
var findInFile = require("./find-in-file");
var allOccurrences = [];


var find = new findInFiles(".", 'http');

find.on('error', function (err) {
    console.log('Error: ' + err);
});

find.on('endSearch', function (occurrences) {
    console.log('final');
    console.log(occurrences.length);
});
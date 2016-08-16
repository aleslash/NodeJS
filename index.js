var findInFiles = require("./find-in-files");
var findInFile = require("./find-in-file");
var allOcurrences = [];

// findInFiles('./', 'http', function (ocurrences) {
//     // allOcurrences.push.apply(allOcurrences,ocurrences);
//     // for (var i = 0, len = allOcurrences.length; i < len; i++) {
//     //     var ocurrence = allOcurrences[i];
//     //     console.log(ocurrence.fileName + ' - ' + ocurrence.row + ' - ' + ocurrence.line);
//     // }
//     console.log(ocurrences.length);
// });

var find = new findInFile("sample.json", 'http');
// find.on('found', function (ocurrence) {
//     console.log(ocurrence);
// });

find.on('error', function (err) {
    console.log('Error: ' + err);
});

find.on('end', function (ocurrences) {
    console.log('final');
    console.log(ocurrences.length);
});
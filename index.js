var findInFiles = require("./find-in-files");

findInFiles('./', 'http', function (allOcurrences) {
    console.log(allOcurrences);
    for (var i = 0, len = allOcurrences.length; i < len; i++) {
        var ocurrence = allOcurrences[i];
        console.log(ocurrence.fileName + ' - ' + ocurrence.row + ' - ' + ocurrence.line);
    }
});
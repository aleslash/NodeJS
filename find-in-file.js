var LineByLineReader = require('line-by-line');
var ocurrences = [];
var row = 0;


module.exports = function (fileName, stringToSearch, callback) {
    var lr = new LineByLineReader(fileName);

    lr.on('error', function (err) {
        console.log('Error reading file ' + fileName + '. ' + err);
    });

    lr.on('line', function (line) {
        row++;
        if (line.indexOf(stringToSearch) !== -1) {
            ocurrences.push({
                row: row,
                line: line.trim(),
                fileName: fileName
            });
        }
    });

    lr.on('end', function () {
        callback(ocurrences);
    });
}
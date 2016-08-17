var LineByLineReader = require('line-by-line');
var events = require("events");

var _ocurrences = [];

var findInFile = function (fileName, stringToSearch) {
    var self = this;

    this._fileName = fileName;
    this._stringToSearch = stringToSearch;
    this._row = 0;

    events.EventEmitter.call(this);

    setImmediate(function () {
        self._initSearch();
    });
    
};

findInFile.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: findInFile,
        enumerable: false
    }
});


findInFile.prototype._initSearch = function () {
    var self = this,
        lr = new LineByLineReader(this._fileName);
    var stringToSearch = this._stringToSearch;
    var row = this._row;
    var fileName = this._fileName;
    var ocurrences = [];

    lr.on('error', function (err) {
        self.emit('error', err);
    });

    lr.on('line', function (line) {
        row++;
        if (line.indexOf(stringToSearch) !== -1) {
            var ocurrence = {
                row: row,
                line: line.trim(),
                fileName: fileName
            };
            ocurrences.push(ocurrence);
            self.emit('found', ocurrence);
        }
    });

    lr.on('end', function () {
        self._ocurrences = ocurrences;
        self.emit('end', ocurrences);
    });
};

module.exports = findInFile;

// module.exports = function (fileName, stringToSearch, callback) {
//     var lr = new LineByLineReader(fileName);

//     lr.on('error', function (err) {
//         console.log('Error reading file ' + fileName + '. ' + err);
//     });

//     lr.on('line', function (line) {
//         row++;
//         if (line.indexOf(stringToSearch) !== -1) {
//             ocurrences.push({
//                 row: row,
//                 line: line.trim(),
//                 fileName: fileName
//             });
//         }
//     });

//     lr.on('end', function () {
//         callback(ocurrences);
//     });
// }
var LineByLineReader = require('line-by-line');
var events = require("events");

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
    var occurrences = [];

    lr.on('error', function (err) {
        self.emit('error', err);
    });

    lr.on('line', function (line) {
        row++;
        if (line.indexOf(stringToSearch) !== -1) {
            var occurrence = {
                row: row,
                line: line.trim(),
                fileName: fileName
            };
            occurrences.push(occurrence);
            self.emit('found', occurrence);
        }
    });

    lr.on('end', function () {
        self.emit('end', occurrences);
    });
};

module.exports = findInFile;
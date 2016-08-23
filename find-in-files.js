var findInFile = require("./find-in-file");
var recursive = require('recursive-readdir');
var events = require("events");
var allOccurrences = [];

var findInFiles = function (path, stringToSearch) {
    var self = this;
    this._path = path;
    this._stringToSearch = stringToSearch;
    this._count = 0;
    this._ended = false;
    this._end = false;

    events.EventEmitter.call(this);

    setImmediate(function () {
        self._getFiles(path);
    });
};

findInFiles.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: findInFiles,
        enumerable: false
    }
});

findInFiles.prototype._getFiles = function (path) {
    var self = this;
    recursive(path, function (err, files) {
        self._files = files;
        setImmediate(function () {
            self._initSearch();
        });
    });
};

findInFiles.prototype._initSearch = function () {
    var self = this;
    this._totalFiles = this._files.length;
    var length = this._totalFiles;
    while(self._count < length) {
        self._findOccurrencesInFile(self._files[self._count], self._stringToSearch);
        self._count++;
    }    
}

findInFiles.prototype._findOccurrencesInFile = function (fileName, stringToSearch) {
    var find = new findInFile(fileName, stringToSearch);
    var self = this;
    find.on('end', function (occurrences) {
        self._addOccurrences(occurrences);
    });
}

findInFiles.prototype._addOccurrences = function (occurrences) {
    var self = this;
    allOccurrences.push(occurrences);
    if(self._count == this._totalFiles){
        self._end = true;
        self._endOfFiles();
    }
    setImmediate(function () {
            self._initSearch();
        });
}

findInFiles.prototype._endOfFiles = function(){
    this.emit('endSearch', allOccurrences);
}

module.exports = findInFiles;
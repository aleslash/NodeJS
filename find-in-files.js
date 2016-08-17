var findInFile = require("./find-in-file");
var recursive = require('recursive-readdir');
var events = require("events");
var allOcurrences = [];

var findInFiles = function (path, stringToSearch) {
    var self = this;
    this._path = path;
    this._stringToSearch = stringToSearch;

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
    self.emit('end');
}

module.exports = findInFiles;

// find.on('error', function (err) {
//     console.log('Error: ' + err);
// });

// find.on('end', function (ocurrences) {
//     console.log('final');
//     console.log(ocurrences.length);
//     console.log(find._ocurrences.length);
// });

// module.exports = function (path, stringToSearch, callback) {
//     recursive(path, function (err, files) {
//         for (var f = 0, length = files.length; f < length; f++) {
//             findInFile(files[f], stringToSearch, function (ocurrences) {
//                 allOcurrences.push.apply(allOcurrences, ocurrences);
//                 //console.log(allOcurrences.length);
//                 callback(allOcurrences);
//             });
//         }
//     });

// }
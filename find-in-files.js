var findInFile = require("./find-in-file");
var recursive = require('recursive-readdir');
var allOcurrences = [];

module.exports = function (path, stringToSearch, callback) {
    recursive(path, function (err, files) {
        for (var f = 0, length = files.length; f < length; f++) {
            findInFile(files[f], stringToSearch, function (ocurrences) {
                allOcurrences.push.apply(allOcurrences,ocurrences);
                console.log(allOcurrences.length);
            });
        }        
    });
    callback(allOcurrences);
}
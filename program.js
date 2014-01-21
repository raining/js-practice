// program /source /path

var fs = require("fs");
var path = require("path");

var sourceDir = process.cwd(); //текущая директория
var resultDir = process.cwd(); //конечная директория

if (process.argv.length >= 2) {
    sourceDir = process.argv[2];
    resultDir = process.argv[3];
}

console.log(sourceDir, resultDir);


//асинхронное чтение файлов и каталогов todo:not yet done!!!!

var readdirs = function(sourceDir, done) {
    var files = [];

    fs.readdir(sourceDir, function(err, data) {
        if (err) throw done(err);
        var size = data.length;
        if (!size) return done(null, files);

        for (var i in data) {
            var file = sourceDir + "/" + data[i];
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    readdirs(file, function(err, res) {
                       files = files.concat(res);
                        if (!--size) done(null, files);
                    });
                } else {
                    files.push(file);
                    if (!--size) done(null, files);
                }
            });
        }
    });
}

readdirs(sourceDir, function(err, res) {
    if (err) throw err;
    console.log(res);
});


//копирование файлов

function filterFileCopy(source, destination, filter) {
    var input = fs.createReadStream(source);
    var output = fs.createWriteStream(destination);

    input.on("data", function(d) {
        if (filter) {
            output.write(data);
        } });
    input.on("error", function(err) { throw err; });
    input.on("end", function() { console.log('fileCopy have finished'); });
}

//filterFileCopy(sDir, dDir, isCSS(file));

//read file, convert file content to string, is it a CSS file and compress it todo:done!
var bytes;
var file = 'test/style.css';

function compressFile(file) {

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        bytes = new Buffer(data);
        var fileToStr = bytes.toString('utf8');
//        console.log('isCSS\n', isCSS(file), 'ZIP\n', zip(fileToStr));
        fs.writeFile(file, zip(fileToStr), function(err) {
            if (err) throw err;
            console.log('file have written\n');
        });
    });

    return file;
}

compressFile(file);

// check is it css file or not by extension, file - String todo:done!
function isCSS(file) {
    return (file.substring(file.lastIndexOf('.') + 1) === 'css');
}

//способ сжатия файлов todo: done!
function zip(file) {
    //удалить пробелы, комментарии,переводы строк

    var pattern = /[^\s | ^\n]+/g;
    var newFile = file.match(pattern).join("");


    var p1 = /[\/\*]/g;
    var p2 = /\*\//g;

    var i = newFile.search(p1);
    var j = newFile.search(p2);

    while (i != -1 && j != -1) {
        var str = newFile.split('');
        var strTmp = str.splice(i, j - i + 2).join('');
        newFile = str.join('');
        i = newFile.search(p1);
        j = newFile.search(p2);
    }

    return newFile;
}


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


var files = [];

//асинхронное чтение файлов и каталогов
//todo: fix method - not all dirs read yet

fs.readdir(sourceDir, function(err, data) {
    if (err) throw err;
    console.log(data);
    files.push(data);
});





//копирование файлов

function filterFileCopy(source, destination, done) {
    var input = fs.createReadStream(source);
    var output = fs.createWriteStream(destination);

    input.on("data", function(d) { output.write(data); });
    input.on("error", function(err) { throw err; });
    input.on("end", function() {
        output.end();
        if (done) done();
    })
}

//read file, convert file content to string, is it a CSS file and compress it todo:done!
var bytes;
var file = 'test/style.css';

fs.readFile(file, 'utf8', function(err, data) {
    if (err) throw err;
    bytes = new Buffer(data);
    var fileToStr = bytes.toString('utf8');
    console.log('isCSS\n', isCSS(file), 'ZIP\n', zip(fileToStr));
});

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

var r = "#color {\ncolor: black; /*!hddf@#ent\ncjd#fdf*//*((comment\n*";
r += "/background-color: white;\npadding: 10px;\n}\ndiv {\n    resize: vertical;\n}";


files.forEach(function(filename) {
    var fullname = path.join(sourceDir, filename);

    var stats = fs.statSync(fullname);

    if (stats.isDirectory()) filename += "/";
    console.log(fullname);
});

//console.log(bytes.toString());


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

//todo: define a extension of file - done
//files.substring(file.lastIndexOf('.') + 1)) 'css', 'html',...


var files = [];

//асинхронное чтение файлов и каталогов
//todo: fix method - not all dirs read yet

fs.readdir(sourceDir, function(err, files) {
    if (err) throw err;

    for (var i in files) {

        if (fs.statSync(files[i]).isDirectory()) {
            fs.readdir(files[i], function(err, filess) {
                if (err) throw err;
//                console.log(files.concat(filess));
            });
        }
        files.push(files[i]);
    }
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

// поиск css файла по расширению
function isCSS(file) {
    return (file.substring(file.lastIndexOf('.') + 1) === 'css');
}

//способ сжатия файлов
function zip(file) {
    //удалить пробелы, комментарии,переводы строк

    var pattern = /[^\s | ^\n]+/g;
    var newFile = file.match(pattern).join("");


    var p1 = /[\/\*]/;
    var p2 = /\*\//;

//    console.log(newFile.search(p1));
//    console.log(newFile.search(p2));

//    for (var i = 0; i < newFile.length; i++) {
//        var startComment = newFile.substr(newFile.search(p1),2); // /*
//        var endComment = newFile.substr(newFile.search(p2),2); // */

        var i = newFile.search(p1);
        var j = newFile.search(p2);

        var arraystr = newFile.split("");

        console.log(arraystr.splice(i, j - i + 2), p1.lastIndex, p2.lastIndex);

//        var i = newFile.search(p1);
//        var j = newFile.search(p2);
//
//        console.log(arraystr.splice(i, j - i + 2));

        var newStr = arraystr.join('');

        console.log(newStr);

//    }

    console.log(newFile);


}

var r = "#color {\ncolor: black; /*!hddf@#ent\ncjd#fdf*//*((comment\n*";
r += "/background-color: white;\npadding: 10px;\n}\ndiv {\n    resize: vertical;\n}";

zip(r);




//files.forEach(function(filename) {
//    var fullname = path.join(sourceDir, filename);
//
//    var stats = fs.statSync(fullname);
//
//    if (stats.isDirectory()) filename += "/";
//    console.log(fullname);
//});

//console.log(bytes.toString());


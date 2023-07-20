
/*const fs = require('fs')
obj = []

var path_write = "C:/Development/sam-ki-server-main/Sample.json"
fs.truncate(path_write, 0, (err) => {
    if (err) {
        console.error('Error truncating file:', err);
        return;
    }
})

fs.watch('C:/Development/sam-ki-server-main/meldungen', (eventType, filename) => {

    var Filename = filename;
    var path_read = "C:/Development/sam-ki-server-main/meldungen/" + Filename;

    if (Filename.includes(".json")) {

        console.log(path_read)
        fs.readFile(path_read, 'utf8', (err, data) => {
            try {
                const Data = JSON.parse(data);
                //console.log(Data);
                obj.push(Data)
                console.log(obj)
                //  var newData = JSON.stringify(obj)
                fs.writeFileSync(path_write, JSON.stringify(obj, null, 2), "utf8");
                console.log("Data successfully saved");
            } catch (err) {
                //  console.log("Error parsing JSON string:", err);
            }
        })

    }
})*/

// import libraries "fs" and "chokidar"
obj = []
const fs = require('fs')
const chokidar = require('chokidar');
const watcher = chokidar.watch('meldungen', {
    persitent: false,
    ignored: '/\.jpeg$/ '
})


// on every new start, make the sample.json empty
var path_write = "C:/Development/sam-ki-server-main/dashboard/Sample.json"
fs.truncate(path_write, 0, (err) => {
    if (err) {
        console.error('Error truncating file:', err);
        return;
    }
})

console.log("Start")
// whenever a file is added
watcher.on('add', path => {

    console.log("In watcher")
    console.log(path, "File is added")
    var path_read = "C:/Development/sam-ki-server-main/" + path;
    console.log(path_read)
    if (path.includes(".json")) {
        fs.readFile(path, 'utf8', (err, data) => {
            try {
                const Data = JSON.parse(data);
                console.log(Data);
                obj.push(Data)
                //  console.log(obj)
                //  var newData = JSON.stringify(obj)
                fs.writeFileSync(path_write, JSON.stringify(obj, null, 2), "utf8");
                console.log("Data successfully saved");
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        })
    }


})

watcher.on('unlink', path => {


    var matches = path.match(/_(\d+)_/);
    if (matches && matches.length > 1) {
        var numberSequence = matches[1];
        ParsednumberSequence = parseInt(numberSequence, 10);
        // console.log(ParsednumberSequence);

        var filteredData = obj.filter(function (obj) {
            return obj.Zeitstempel !== ParsednumberSequence;
        });
        obj = filteredData
        fs.writeFileSync(path_write, JSON.stringify(obj, null, 2), "utf8");
        //console.log(obj);
        console.log(path, ": File is deleted")
    } else {
        console.log("Number sequence not found.");
    }

})


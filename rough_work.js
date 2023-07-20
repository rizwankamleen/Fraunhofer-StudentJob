const fs = require('fs');

const folderPath = './GraphsPDF';

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    let latestFile;
    let latestFileTimestamp = 0;

    files.forEach((file) => {
        const filePath = folderPath + '/' + file;
        const fileStats = fs.statSync(filePath);

        if (fileStats.isFile() && fileStats.mtimeMs > latestFileTimestamp) {
            global.latestFile = file;
            latestFileTimestamp = fileStats.mtimeMs;
        }
    });

    console.log('Latest file:', latestFile);
});

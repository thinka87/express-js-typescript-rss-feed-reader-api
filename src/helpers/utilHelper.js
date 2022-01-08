const fs = require('fs');
const https = require('https')
const crypto = require('crypto');

const downloadFile = (URL, savePath, cb) => {

    https.get(URL, (res) => {

        const filePath = fs.createWriteStream(savePath);
        res.pipe(filePath);

        filePath.on('finish', () => {
            filePath.close(cb);

        })
    })

}

const makeFileName = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


const generateChecksum = (str, algorithm, encoding) => {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

module.exports = { downloadFile, makeFileName, generateChecksum };
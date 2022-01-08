let Parser = require('rss-parser');
let parser = new Parser();
const NodeID3 = require('node-id3')
const utilHelper = require('../helpers/utilHelper')
const validUrl = require('valid-url');
const fs = require('fs')
const config = require('../config/config');

const getRssFeedByURL = (req, res) => {

    if (validUrl.isUri(req.query.rssURL)) {
        (async () => {
            try {
                let feed = await parser.parseURL(req.query.rssURL);
                var result = [];

                feed.items.forEach(item => {
                    //result.push({ title: item.title, url: item.link });
                    //result.push(item.enclosure.url);
                    //result.push(item.enclosure.url);
                    //res.json(item);//console.log(item.title + ':' + item.link)
                    var randFileName = utilHelper.makeFileName(10);
                    const path = config.temp_folder_path + randFileName + '.mp3'; 
                    var checksum=utilHelper.generateChecksum(item.enclosure.url)
                    result.push({ title: item.title, checksum:checksum, url: item.link }); 
                      
                });

                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({status:"SUCCESS",message:result});
                             
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(422).json({status:"ERROR",message:err});
            }

        })();

    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(422).json({status:"ERROR",message:"Invalid rss URL"});
    }

}

const getID3TagInfo = (req, res) => {

    if (validUrl.isUri(req.query.MP3URL)) {
        const url = req.query.MP3URL;
        var randFileName = utilHelper.makeFileName(10);
        const path = config.temp_folder_path + randFileName + '.mp3';
        utilHelper.downloadFile(url, path, function () {

            fs.readFile(path,  (err, data) => {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(422).json({status:"ERROR",message:err});
            }

            fs.unlink(path,function(){
                NodeID3.read(data, function (err, tags) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json({status:"SUCCESS",message:tags});
                });
            })

        })

        });

    } else {    
        res.setHeader('Content-Type', 'application/json');
        res.status(422).json({status:"ERROR",message:"Invalid MP3 URL"});
    }
}

module.exports = { getRssFeedByURL, getID3TagInfo };
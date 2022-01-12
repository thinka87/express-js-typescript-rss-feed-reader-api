import crypto from "crypto";
import download from "download";
import fs from "fs";
import NodeID3 from "node-id3";
import config from "../config";

export const readTagsFromFile = async (file) => {
  return   NodeID3.read(file);
};

export const getChecksum = async (fileurl) => {
  
        const fileName =  makeFileName(10);
        const path =  `${config.temp_folder_path}${fileName}.mp3`;
        await downloadFile(fileurl ,path);
        const fileData=  fs.readFileSync(path);
        const chksum =await generateChecksum(fileData);
        fs.unlink(path,(err) =>{
          console.log(`File deleted : ${path},` );
        });
        return chksum;
};


export const makeFileName = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateChecksum =  (str, algorithm, encoding) => {
  return  crypto
    .createHash(algorithm || "md5")
    .update(str, "utf8")
    .digest(encoding || "hex");
};

export const downloadFile = async (URL, savePath) => {
  return  fs.writeFileSync(savePath, await download(URL));
};



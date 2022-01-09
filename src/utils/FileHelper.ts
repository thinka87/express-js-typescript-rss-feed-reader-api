import crypto from "crypto";
import https from "https";
import fs from "fs";
import NodeID3 from "node-id3";

export const readTagsFromFile = async (file) => {
  return NodeID3.read(file);
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

export const generateChecksum = (str, algorithm, encoding) => {
  return crypto
    .createHash(algorithm || "md5")
    .update(str, "utf8")
    .digest(encoding || "hex");
};

export const downloadFile = (URL, savePath, cb) => {
  https.get(URL, (res) => {
    const filePath = fs.createWriteStream(savePath);
    res.pipe(filePath);

    filePath.on("finish", () => {
      filePath.close(cb);
    });
  });
};

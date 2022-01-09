import Parser from "rss-parser";
import fs from "fs";
import * as FileHelper from "../utils/FileHelper";
import * as Validator from "../utils/Validator";
import config from "../config";
class RSSFeed {
  readonly fileHelper;
  readonly validator;
  readonly parser;

  constructor(fileHelper, validator, Parser) {
    this.fileHelper = fileHelper;
    this.validator = validator;
    this.parser = new Parser();
  }

  async feedByURL(uri: string) {
    if (!this.validator.isValidURI(uri)) {
      throw new Error("Invalid URI");
    }
    try {
      const feed = await this.parser.parseURL(uri);
      return feed?.items?.map((item) => {
        const checksum = this.fileHelper.generateChecksum(item.enclosure.url);
        return { title: item.title, checksum: checksum, url: item.link };
      });
    } catch (e) {
      throw new Error(
        "Error occurred while fetching feed URI, Please try again"
      );
    }
  }

  async getTagInfo(uri: string) {
    if (!this.validator.isValidURI(uri)) {
      throw new Error("Invalid URI");
    }
    try {

      const fileName = this.fileHelper.makeFileName(10);
      const path = `${config.temp_folder_path}${fileName}.mp3`;
      const filedownload = await this.fileHelper.downloadFile(uri, path);
      const taginfo = await this.fileHelper.readTagsFromFile(path);
      fs.unlinkSync(path);
      return taginfo ;
    } catch (e) {
      console.log(e);
      throw new Error(
        "Error occurred while fetching tag info, Please try again"
      );
    }
  }
}

export default new RSSFeed(FileHelper, Validator, Parser);

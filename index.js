#!/usr/bin/env node

require("colors");
const fs = require("fs-extra");
const path = require("path");

const configFileDir = require("appdata-path").getAppDataPath("99dl");
const configFile = path.join(configFileDir, "config.json");
const tmpDir = path.join(configFileDir, "tmp");

class dl {
  static initConfig() {
    if (!fs.existsSync(configFileDir)) fs.mkdirsSync(configFileDir);
    if (!fs.existsSync(configFile))
      fs.writeFileSync(
        configFile,
        JSON.stringify({
          download: {
            thread: 3,
            timeout: 2000,
            tmpDir: tmpDir,
            downloadType: "txt"
          }
        })
      );
  }

  static getConfig() {
    dl.initConfig();
    let config = require(configFile);
    if (!config.download.thread) config.download.thread = 3;
    if (!config.download.timeout) config.download.timeout = 3000;
    if (!config.download.tmpDir) config.download.tmpDir = tmpDir;
    if (!config.download.downloadTpye) config.download.downloadType = "txt";
    return config;
  }

  static writeConfig(config) {
    fs.writeFileSync(configFile, JSON.stringify(config));
  }
}

module.exports = dl;

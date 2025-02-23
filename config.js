const fs = require('fs');
const path = require('path');

let config = {};

function loadConfigFromEnv() {
  const configJson = process.env.MY_CONFIG_JSON;
  if (configJson) {
    try {
      config = JSON.parse(configJson);
      console.log('Configuration loaded from GitHub Secrets.');
    } catch (error) {
      console.error('Error parsing JSON configuration from secrets:', error);
    }
  } else {
    console.log('GitHub Secrets not found. Loading from production.json.');
    loadConfigFromFile();
  }
}

function loadConfigFromFile() {
  const configFilePath = path.join(__dirname, 'config', 'production.json'); // Assumes config directory is in the same directory as config.js

  try {
    const fileData = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(fileData);
    console.log('Configuration loaded from production.json.');
  } catch (error) {
    console.error('Error loading configuration from production.json:', error);
    if(Object.keys(config).length === 0){
        console.error("Application cannot start without configuration")
        process.exit(1);
    }
  }
}

// Load configuration on module initialization
loadConfigFromEnv();

module.exports = {
  get: (key, defaultValue) => {
    const keys = key.split('.');
    let value = config;

    for (const k of keys) {
      if (value && typeof value === 'object' && value.hasOwnProperty(k)) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return value;
  },
};
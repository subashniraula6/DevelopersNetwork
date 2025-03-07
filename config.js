const process = require('process');

let config = {};

function loadConfigFromEnv() {
  const mongoURI = process.env.MONGO_URI;
  const jwtSecret = process.env.JWT_SECRET;
  const githubClientId = process.env.GIT_HUB_CLIENT_ID;
  const githubSecret = process.env.GIT_HUB_SECRET;

  if (mongoURI && jwtSecret && githubClientId && githubSecret) {
    config = {
      mongoURI,
      jwtSecret,
      githubClientId,
      githubSecret,
    };
    console.log('Configuration loaded from environment variables.');
  } else {
    console.log('No backend configuration found in environment variables.');
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
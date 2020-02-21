// Default options
const options = {
  SANDBOX: false,
  HEADLESS: true,
  DEVTOOLS: false,
  SERVER: false
};

// Provided optons via env vars
Object.keys(options).forEach((option) => {
  const envOption = process.env[option];
  // If option provided via env vars
  if (typeof envOption !== 'undefined') {
    // Convert string to boolean
    options[option] = (envOption === 'true');
  }
});

module.exports = {
  launch: {
    args: options.SANDBOX ? [] : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    headless: options.HEADLESS,
    devtools: options.DEVTOOLS
  },
  server: options.SERVER && {
    command: 'npm start',
    launchTimeout: 2 * 60 * 1000,
    port: process.env.PORT || 3000
  }
};

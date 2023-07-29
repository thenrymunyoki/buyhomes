const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config.js'); // Update the path to your webpack configuration file

async function build() {
  try {
    // Check if NODE_ENV is defined in the environment variables
    if (!process.env.NODE_ENV) {
      console.error('Error: NODE_ENV environment variable is not set.');
      process.exit(1);
    }

    // Run webpack with the specified configuration
    await new Promise((resolve, reject) => {
      webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.error('Error during build:', err || stats.toString());
          process.exit(1);
        } else {
          console.log('Build completed successfully!');
          resolve();
        }
      });
    });
  } catch (err) {
    console.error('Error during build:', err);
    process.exit(1);
  }
}

build();

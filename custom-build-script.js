const webpack = require('webpack');
const webpackConfig = require('config/webpack.config.js'); // Replace 'webpack.config.js' with the name of your webpack configuration file if different

async function build() {
  try {
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

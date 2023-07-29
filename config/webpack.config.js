const path = require('path');

module.exports = {
  entry: './src/App.js', // Replace 'App.js' with the correct path to your React application's entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      // Add aliases for your custom modules or directories here, if needed
    },
    extensions: ['.js', '.jsx'], // Add any other extensions you want to resolve automatically
  },
};

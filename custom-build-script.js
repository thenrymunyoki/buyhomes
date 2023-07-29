const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.resolve(__dirname, 'src');
const targetDir = path.resolve(__dirname, 'dist');

async function build() {
  try {
    // Clear the target directory if it already exists
    await fs.emptyDir(targetDir);

    // Copy the contents of the source directory to the target directory
    await fs.copy(sourceDir, targetDir);

    console.log('Build completed successfully!');
  } catch (err) {
    console.error('Error during build:', err);
    process.exit(1);
  }
}

build();

const fs = require('fs');
const path = require('path');

// Define the paths
const mainReadmePath = path.join(__dirname, 'src/app/README.md');  // Save combined README here
const appDir = path.join(__dirname, 'src/app');  // Directory to search for sub-READMEs

// Function to get all README.md files from the app directory
function getReadmeFiles(dir) {
  let readmeFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      readmeFiles = readmeFiles.concat(getReadmeFiles(fullPath));
    } else if (file === 'README.md') {
      readmeFiles.push(fullPath);
    }
  });

  return readmeFiles;
}

// Combine the content of the readme files
function combineReadmeFiles() {
  const readmeFiles = getReadmeFiles(appDir);
  let combinedContent = '# Combined Documentation\n\n';

  readmeFiles.forEach(filePath => {
    const relativePath = path.relative(__dirname, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const sectionTitle = `## ${relativePath}\n\n`;
    combinedContent += sectionTitle + content + '\n\n';
  });

  fs.writeFileSync(mainReadmePath, combinedContent, 'utf-8');
  console.log('All README files have been combined into src/app/README.md');
}

combineReadmeFiles();

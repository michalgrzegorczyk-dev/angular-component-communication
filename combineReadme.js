const fs = require('fs');
const path = require('path');

const mainReadmePath = path.join(__dirname, 'src/app/README.md');
const appDir = path.join(__dirname, 'src/app');

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

function combineReadmeFiles() {
  const readmeFiles = getReadmeFiles(appDir);
  let combinedContent = '# Components Communication in Angular\n\n';

  readmeFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    combinedContent += content + '\n\n';
  });

  fs.writeFileSync(mainReadmePath, combinedContent, 'utf-8');
  console.log('All README files have been combined into src/app/README.md');
}

combineReadmeFiles();

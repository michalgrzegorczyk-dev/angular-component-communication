const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'public/blog-post/README.md');
const partsDir = path.join(__dirname, 'public/blog-post/parts');
const appDir = path.join(__dirname, 'src/app');
const contentPath = path.join(partsDir, 'README.content.md');

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

function safeReadFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.warn(`Warning: Unable to read file ${filePath}. Skipping.`);
    return '';
  }
}

function safeWriteFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully wrote to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
}

function combineAppReadmeFiles() {
  let combinedContent = safeReadFile(contentPath);
  const appReadmeFiles = getReadmeFiles(appDir);

  appReadmeFiles.forEach(filePath => {
    const content = safeReadFile(filePath);
    combinedContent += content + '\n\n';
  });

  safeWriteFile(contentPath, combinedContent.trim());
}

function createFinalReadme() {
  const introPart = safeReadFile(path.join(partsDir, 'README.intro.md'));
  const contentPart = safeReadFile(contentPath);
  const outroPart = safeReadFile(path.join(partsDir, 'README.outro.md'));

  const finalContent = `${introPart}\n\n${contentPart}\n\n${outroPart}`.trim();
  safeWriteFile(outputPath, finalContent);
}

function combineReadmeFiles() {
  combineAppReadmeFiles();
  createFinalReadme();
  console.log('README files have been combined as requested.');
}

combineReadmeFiles();

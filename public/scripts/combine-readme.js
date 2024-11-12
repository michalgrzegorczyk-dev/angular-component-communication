const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'public/blog-post/README.md');
const partsDir = path.join(__dirname, 'public/blog-post/parts');
const appDir = path.join(__dirname, 'src/app');
const contentPath = path.join(partsDir, 'README.content.md');

function getOrderedNumber(dirName) {
  const match = dirName.match(/^(\d+)-/);
  return match ? parseInt(match[1]) : Infinity;
}

function getReadmeFiles(dir, isRoot = true) {
  let readmeFiles = [];
  const files = fs.readdirSync(dir);

  // Only process top-level directories if this is the root call
  if (isRoot) {
    const directories = files
      .map(file => ({
        name: file,
        path: path.join(dir, file),
        isDirectory: fs.statSync(path.join(dir, file)).isDirectory()
      }))
      .filter(file => file.isDirectory)
      .sort((a, b) => getOrderedNumber(a.name) - getOrderedNumber(b.name));

    // Get README.md from each top-level directory
    directories.forEach(directory => {
      const readmePath = path.join(directory.path, 'README.md');
      if (fs.existsSync(readmePath)) {
        readmeFiles.push(readmePath);
      }
    });

    return readmeFiles;
  }

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
  const appReadmeFiles = getReadmeFiles(appDir, true);

  // Log the order of processing for debugging
  console.log('Processing files in the following order:');
  appReadmeFiles.forEach(file => console.log(`- ${path.relative(appDir, file)}`));

  appReadmeFiles.forEach(filePath => {
    const content = safeReadFile(filePath);
    combinedContent += '\n\n' + content;
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
  console.log('README files have been combined in order.');
}

combineReadmeFiles();

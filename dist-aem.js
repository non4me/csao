const fs = require('fs');
const concat = require('concat-files');
const bundleFiles = [
  './dist/inline.bundle.js',
  './dist/polyfills.bundle.js',
  './dist/styles.bundle.js',
  './dist/main.bundle.js'
];
const distFilesToRemove = [
  './dist/inline.bundle.js',
  './dist/polyfills.bundle.js',
  './dist/styles.bundle.js',
  './dist/main.bundle.js',
  './dist/favicon.ico',
  './dist/index.html'
];
const inletDistNecessaryFiles = [
  'inlet.html',
  'icon.png',
  'inlet_definition.json',
  'preview.html',
  'widget.json'
];

concat(bundleFiles, './dist/inlet.js', function (err) {
  if (err) throw err;
  console.log('concat files to inlet file done');
  distFilesToRemove.map(fs.unlinkSync);
  inletDistNecessaryFiles.map(file => {
    fs.copyFileSync(`./src/${file}`, `./dist/${file}`);
  });
});

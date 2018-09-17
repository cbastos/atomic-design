const { exec } = require('child_process');

console.log('starting npm install...This can take several minutes. Please wait.');
const installation = exec('npm install', (err, stdout, stderr) => {
  if (err) {
    console.log('npm install [FAILED]. Try to execute manually inside project root path.', err);
    return;
  }
  console.log('packages updated!');
});

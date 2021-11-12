const hostName = require('os').hostname();
const { spawn } = require('child_process');
const ngArgs = ['serve', '--port', '4200', '--host', hostName];
if (process.argv[2] && process.argv[2] === '--dist') {
  ngArgs.push('--configuration');
  ngArgs.push('production');
}
spawn('ng', ngArgs, {
  stdio: 'inherit'
});
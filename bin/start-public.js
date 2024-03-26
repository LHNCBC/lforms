const hostName = require('os').hostname();
const { spawn } = require('child_process');
const ngArgs = ['serve', '--port=4200',
    '--host=0.0.0.0', // binding all ips
    '--public-host=http://localhost:4201', // for web socket client to be able to connect
    '--configuration=debugging']

spawn('ng', ngArgs, {
  stdio: 'inherit'
});

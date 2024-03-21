const hostName = require('os').hostname();
const { spawn } = require('child_process');
const ngArgs = ['serve', '--port', '4200',
    '--host', '0.0.0.0', // binding all ips
    '--public-host', hostName, // binding host name
    '--configuration=debugging',
    '--disable-host-check']; // Using a different host than the one passed to the "--host" flag might result in
                             // websocket connection issues. You might need to use "--disable-host-check"
                             // if that's the case.

spawn('ng', ngArgs, {
  stdio: 'inherit'
});

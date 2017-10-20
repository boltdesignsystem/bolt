const browserstack = require('browserstack-local');
const { spawn } = require('child_process');

// Start Browserstack local tunnel
const local = new browserstack.Local();
local.start({
  key: 'Gq4tSmzPy99rJzAVcWBk'
}, () => {
  // Then run "wct test --configFile browserstack.wct.conf.js"
  const child = spawn('wct', [
    'test',
    '--configFile',
    'browserstack.wct.conf.js'
  ], { stdio: 'inherit' });
  child.on('close', code => {
    local.stop(() => {
      process.exit(code);
    });
  });
});
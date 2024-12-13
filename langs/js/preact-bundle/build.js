const child_process = require('child_process');

function run(command) {
  const [cmd, ...args] = command.split(' ');
  const env = { NODE_NO_WARNINGS: 1 };
  child_process.spawn(cmd, args, { stdio: 'inherit', shell: true, env });
}

// run('microbundle src/mini.mjs --name=miniBundle -o dist/mini.js -f es,umd --no-sourcemap --target web');
// run('microbundle src/bundle.mjs --name=bigBundle -o dist/bundle.js -f es,umd --no-sourcemap --target web');
// run('microbundle src/abc.js --name=abc -o dist/abc.js -f es,umd');
// run('microbundle src/rxjs.mjs --name=rxjs -o dist/rxjs.js -f es,umd --no-sourcemap --target web');
// run('microbundle src/all-bundle.mjs --name=allBundle -o dist/all-bundle.js -f es,umd --no-sourcemap --target web');

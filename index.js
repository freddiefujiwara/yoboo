#!/usr/bin/env node
if (process.argv.length !== 3) {
  let usage = `Usage: ${process.argv[0]} ${process.argv[1]} `;
  usage += `<source.yaml>`;
  console.error(usage);
  process.exit(0);
}

var Yoboo = require('./lib/yoboo');
var yb = new Yoboo(process.argv[2]);
yb.load();
yb.parse();
yb.install();
yb.import();
yb.compile();
yb.run();

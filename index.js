#!/usr/bin/env node

var Yoboo = require('./lib/yoboo');
var yb = new Yoboo(process.argv[2]);
yb.load();
yb.parse();
yb.install();
yb.import();
yb.compile();
yb.run();

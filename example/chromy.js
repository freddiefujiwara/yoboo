'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var chromy = _interopRequireDefault(require('chromy'));
chromy = chromy['default'];
var fs = _interopRequireDefault(require('fs'));
fs = fs['default'];
async function run(){
	var ch=	await new chromy({launchBrowser:false});
	await ch.emulate("iPhone6");
	await ch.goto("http://www.google.com");
	var png=	await ch.screenshot();
	await fs.writeFileSync("chromy.png",png);
	await ch.close();
}
run();

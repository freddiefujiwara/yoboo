'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var fs = _interopRequireDefault(require('fs'));
fs = fs['default'];
async function run(){
	var file=	await fs.readFileSync("example/cat.yaml","utf-8");
	await console.log(file);
}
run();

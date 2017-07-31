var chromeless = require('chromeless');
chromeless = chromeless['default'];
async function run(){
	var ch=new chromeless();
	await ch.goto("http://www.google.com");
	await ch.type("yoboo","input[name='q']");
	await ch.press(13);
	await ch.wait('#resultStats');
	var file=	await ch.screenshot();
	await console.log(file);
	await ch.end();
}
run();

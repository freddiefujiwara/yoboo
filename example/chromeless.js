import chromeless from 'chromeless';
async function run(){
	let ch=new chromeless();
	await ch.goto("http://www.google.com");
	await ch.type("yoboo","input[name='q']");
	await ch.press(13);
	await ch.wait('#resultStats');
	let file=	await ch.screenshot();
	await console.log(file);
	await ch.end();
}
run();
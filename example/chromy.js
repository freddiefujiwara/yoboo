import chromy from 'chromy';
import fs from 'fs';
async function run(){
	let ch=	await new chromy({launchBrowser:false});
	await ch.emulate("iPhone6");
	await ch.goto("http://www.google.com");
	let png=	await ch.screenshot();
	await fs.writeFileSync("chromy.png",png);
	await ch.close();
}
run();
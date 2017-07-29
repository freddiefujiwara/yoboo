import fs from 'fs';
async function run(){
	let file=	await fs.readFileSync("example/cat.yaml","utf-8");
	await console.log(file);
}
run();
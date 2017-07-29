import fs from 'fs';
import yaml from 'js-yaml';
import child_process from 'child_process';

export default class Task {
    constructor(yamlFile){
        this.yamlFile = yamlFile;
        this.source = '';
        this.tmpFile = Math.random().toString(36).substr(2, 9);
    }
    load(){
        this.yaml = fs.readFileSync('example/cat.yaml','utf-8');
    }
    parse(){
        this.parsed = yaml.safeLoad(this.yaml);
    }
    import(){
        if(this.parsed.imports){
            this.parsed.imports.forEach((module) => {
                this.source += "import " + module + " from '" + module + "';\n";
            });
        }
    }
    run(){
        this.source += "async function run(){\n";
        this.parsed.tasks.forEach( (command) => {
            if(command.assignTo){
                this.source += "\tlet " + command.assignTo + '=';
            }
            this.source += "\tawait " + command.function + '(';
            if(command.args){
                let args = [];
                command.args.forEach((arg) => {
                    if((typeof arg) === "object"){
                        args.push(arg.val);
                    }else{
                        args.push('"' + arg + '"');
                    }
                });
                this.source += args.join(",");
            }
            this.source += ");\n";
        });
        this.source += "}\nrun();";
        fs.writeFileSync(this.tmpFile +'.js',this.source,'utf-8');
        let babelNodePath = require.resolve('babel-cli/bin/babel-node')
        child_process.exec([process.argv[0],babelNodePath,this.tmpFile].join(" "), (error, stdout, stderr) => {
            console.log(stdout);
            fs.unlinkSync(this.tmpFile+'.js');
        });
    }
}

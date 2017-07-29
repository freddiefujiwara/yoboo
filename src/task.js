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
        this.yaml = fs.readFileSync(this.yamlFile,'utf-8');
    }
    parse(){
        this.parsed = yaml.safeLoad(this.yaml);
    }
    install(){
        if(this.parsed.installs){
            this.parsed.installs.forEach((module) => {
                child_process.execSync("npm i " + module,{stdio:[0,1,2]});
            });
        }
    }
    import(){
        if(this.parsed.imports){
            this.parsed.imports.forEach((module) => {
                this.source += "import " + module + " from '" + module + "';\n";
            });
        }
    }
    compile(){
        this.source += "async function run(){\n";
        this.parsed.tasks.forEach( (command) => {
            if(command.assignTo){
                this.source += "\tlet " + command.assignTo + '=';
            }
            if(!command.noawait){
                this.source += "\tawait ";
            }
            this.source += command.function + '(';
            if(command.args){
                let args = [];
                command.args.forEach((arg) => {
                    args.push((typeof arg) === "object" ? arg.raw : '"'+arg+'"');
                });
                this.source += args.join(",");
            }
            this.source += ");\n";
        });
        this.source += "}\nrun();";
    }
    run(){
        fs.writeFileSync(this.tmpFile +'.js',this.source,'utf-8');
        let babelNodePath = require.resolve('babel-cli/bin/babel-node')
        child_process.execSync(
            [process.argv[0],babelNodePath,this.tmpFile].join(" "),
            {stdio:[0,1,2]});
        fs.unlinkSync(this.tmpFile+'.js');
    }
}

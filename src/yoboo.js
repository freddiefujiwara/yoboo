/* eslint no-eval: 0 */
import fs from 'fs';
import yaml from 'js-yaml';
import {execSync} from 'child_process';
import {transform} from 'babel-core';

/**  
** main class of Yaboo(YAML task runner)
*/
export default class Yoboo {
  /**
   * @constructor
   * @param {yamlFile} yamlFile The source code of Yaboo
   */
  constructor(yamlFile) {
    this.yamlFile = yamlFile;
    this.source = '';
  }
  /**
   * just load this.yamlFile and store to this.yaml
   */
  load() {
    this.yaml = fs.readFileSync(this.yamlFile, 'utf-8');
  }
  /**
   * parse this.yaml
   */
  parse() {
    this.parsed = yaml.safeLoad(this.yaml);
  }
  /**
   * insall npm package if needed
   */
  install() {
    if (this.parsed.installs) {
      for (let i = 0; i < this.parsed.installs.length; i += 1) {
        const module = this.parsed.installs[i];
        execSync(`npm i ${module}`, {stdio: [0, 1, 2]});
      }
    }
  }
  /**
   * import npm packages
   */
  import() {
    if (this.parsed.imports) {
      for (let i = 0; i < this.parsed.imports.length; i += 1) {
        const module = this.parsed.imports[i];
        this.source += `import ${module} from '${module}';\n`;
      }
    }
  }
  /**
   * compile this.yaml to this.source
   */
  compile() {
    this.source += 'async function run(){\n';
    for (let t = 0; t < this.parsed.tasks.length; t += 1) {
      const command = this.parsed.tasks[t];
      if (command.assignTo) {
        this.source += `\tlet ${command.assignTo}=`;
      }
      if (!command.noawait) {
        this.source += '\tawait ';
      }
      this.source += `${command.function}(`;
      if (command.args) {
        const args = [];
        for (let a = 0; a < command.args.length; a += 1) {
          const arg = command.args[a];
          args.push((typeof arg) === 'object' ? arg.raw : `"${arg}"`);
        }
        this.source += args.join(',');
      }
      this.source += ');\n';
    }
    this.source += '}\nrun();';
  }
  /**
   * run this.source
   */
  run() {
    eval(transform(this.source, {presets: ['es2015']}).code);
  }
}

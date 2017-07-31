/* eslint no-eval: 0 */
import fs from 'fs';
import yaml from 'js-yaml';
import {execSync} from 'child_process';

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
        execSync(`npm i --no-save ${module}`, {stdio: [0, 1, 2]});
      }
    }
  }
  /**
   * import npm packages
   */
  import() {
    this.source += `'use strict';\n`;
    this.source += `Object.defineProperty(exports, "__esModule"`;
    this.source += `, {value: true});\n`;
    this.source += `function _interopRequireDefault(obj)`;
    this.source += ` { return obj && obj.__esModule ? obj :`;
    this.source += ` { default: obj }; }\n`;

    if (this.parsed.imports) {
      for (let i = 0; i < this.parsed.imports.length; i += 1) {
        const module = this.parsed.imports[i];
        this.source += `var ${module} = `;
        this.source += `_interopRequireDefault(require('${module}'));\n`;
        this.source += `${module} = ${module}['default'];\n`;
      }
    }
  }
  /**
   * compile this.yaml to this.source
   */
  compile() {
    const source = [];
    source.push( 'async function run(){' );
    for (let t = 0; t < this.parsed.tasks.length; t += 1) {
      const task = this.parsed.tasks[t];
      const literal = [];
      if (task.assignTo) {
        literal.push( `\tvar ${task.assignTo}=` );
      }
      if (!task.noawait) {
        literal.push( '\tawait ' );
      }
      literal.push( `${task.function}(` );
      if (task.args) {
        const args = [];
        for (let a = 0; a < task.args.length; a += 1) {
          const arg = task.args[a];
          args.push((typeof arg) === 'object' ? arg.raw : `"${arg}"`);
        }
        literal.push( args.join(',') );
      }
      literal.push( ');' );
      source.push( literal.join('') );
    }
    source.push( '}' );
    source.push( 'run();' );
    this.source += source.join('\n') + '\n';
  }
  /**
   * run this.source
   */
  run() {
    eval(this.source);
  }
}

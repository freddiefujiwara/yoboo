import chai from 'chai';
import fs from 'fs';
let should = chai.should();
import Task from '../src/task';

describe('Task test.', (suite) => {
  it('should have properties filename', () => {
    let task = new Task('example/cat.yaml');
    task.should.have.property('yamlFile').with.equal('example/cat.yaml');
  });
  it('should have a function "load"', () => {
    let task = new Task('example/cat.yaml');
    task.should.have.property('load').with.a('function');
    task.load();
    task.should.have.property('yaml').with.equal(fs.readFileSync('example/cat.yaml','utf-8'));
    task.should.have.property('tmpFile').with.a('string');
  });
  it('should have a function "parse"', () => {
    let task = new Task('example/cat.yaml');
    task.should.have.property('parse').with.a('function');
    task.load();
    task.parse();
    task.should.have.property('parsed');
  });
  it('should have a function "install"', () => {
    let task = new Task('example/cat.yaml');
    task.should.have.property('install').with.a('function');
    task.load();
    task.parse();
    task.install();
    task.should.have.property('source');
  });
  it('should have a function "import"', () => {
    let task = new Task('example/cat.yaml');
    task.should.have.property('import').with.a('function');
    task.load();
    task.parse();
    task.install();
    task.import();
    task.should.have.property('source');
  });
  it('should have a function "compile"', function(){
    this.timeout(200000);
    let task = new Task('example/cat.yaml');
    task.should.have.property('compile').with.a('function');
    task.load();
    task.parse();
    task.install();
    task.import();
    task.compile();
    task.should.have.property('source').equal(fs.readFileSync('example/cat.js','utf-8'));

    task = new Task('example/chromy.yaml');
    task.load();
    task.should.have.property('yaml').with.equal(fs.readFileSync('example/chromy.yaml','utf-8'));
    task.parse();
    task.install();
    task.import();
    task.compile();
    task.should.have.property('source').equal(fs.readFileSync('example/chromy.js','utf-8'));

    task = new Task('example/chromeless.yaml');
    task.load();
    task.should.have.property('yaml').with.equal(fs.readFileSync('example/chromeless.yaml','utf-8'));
    task.parse();
    task.install();
    task.import();
    task.compile();
    task.should.have.property('source').equal(fs.readFileSync('example/chromeless.js','utf-8'));
  });
  it('should have a function "run"', function(){
    this.timeout(200000);
    let task = new Task('example/cat.yaml');
    task.should.have.property('run').with.a('function');
    task.load();
    task.parse();
    task.install();
    task.import();
    task.compile();
    task.run();
  });
});

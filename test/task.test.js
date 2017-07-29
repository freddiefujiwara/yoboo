import chai from 'chai';
import fs from 'fs';
let should = chai.should();
import Task from '../src/task';

describe('Task test.', () => {
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
  it('should have a function "import"', () => {
    let task = new Task('example/cat.yaml');
    task.should.have.property('import').with.a('function');
    task.load();
    task.parse();
    task.import();
    task.should.have.property('source');
  });
  it('should have a function "run"', () => {
    let task = new Task('example/cat.yaml');
    task.should.have.property('run').with.a('function');
    task.load();
    task.parse();
    task.import();
    task.run();
    task.should.have.property('source');
  });
});

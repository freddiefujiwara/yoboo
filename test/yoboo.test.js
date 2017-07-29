import chai from 'chai';
import fs from 'fs';
let should = chai.should();
import Yoboo from '../src/yoboo';

describe('Yoboo test.', (suite) => {
  it('should have properties filename', () => {
    let yb = new Yoboo('example/cat.yaml');
    yb.should.have.property('yamlFile').with.equal('example/cat.yaml');
  });
  it('should have a function "load"', () => {
    let yb = new Yoboo('example/cat.yaml');
    yb.should.have.property('load').with.a('function');
    yb.load();
    yb.should.have.property('yaml').with.equal(fs.readFileSync('example/cat.yaml','utf-8'));
    yb.should.have.property('tmpFile').with.a('string');
  });
  it('should have a function "parse"', () => {
    let yb = new Yoboo('example/cat.yaml');
    yb.should.have.property('parse').with.a('function');
    yb.load();
    yb.parse();
    yb.should.have.property('parsed');
  });
  it('should have a function "install"', () => {
    let yb = new Yoboo('example/cat.yaml');
    yb.should.have.property('install').with.a('function');
    yb.load();
    yb.parse();
    yb.install();
    yb.should.have.property('source');
  });
  it('should have a function "import"', () => {
    let yb = new Yoboo('example/cat.yaml');
    yb.should.have.property('import').with.a('function');
    yb.load();
    yb.parse();
    yb.install();
    yb.import();
    yb.should.have.property('source');
  });
  it('should have a function "compile"', function(){
    this.timeout(200000);
    let yb = new Yoboo('example/cat.yaml');
    yb.should.have.property('compile').with.a('function');
    yb.load();
    yb.parse();
    yb.install();
    yb.import();
    yb.compile();
    yb.should.have.property('source').equal(fs.readFileSync('example/cat.js','utf-8'));

    yb = new Yoboo('example/chromy.yaml');
    yb.load();
    yb.should.have.property('yaml').with.equal(fs.readFileSync('example/chromy.yaml','utf-8'));
    yb.parse();
    yb.install();
    yb.import();
    yb.compile();
    yb.should.have.property('source').equal(fs.readFileSync('example/chromy.js','utf-8'));

    yb = new Yoboo('example/chromeless.yaml');
    yb.load();
    yb.should.have.property('yaml').with.equal(fs.readFileSync('example/chromeless.yaml','utf-8'));
    yb.parse();
    yb.install();
    yb.import();
    yb.compile();
    yb.should.have.property('source').equal(fs.readFileSync('example/chromeless.js','utf-8'));
  });
  it('should have a function "run"', function(){
    this.timeout(200000);
    let yb = new Yoboo('example/cat.yaml');
    yb.should.have.property('run').with.a('function');
    yb.load();
    yb.parse();
    yb.install();
    yb.import();
    yb.compile();
    yb.run();
  });
});
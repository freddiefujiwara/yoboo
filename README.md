[![Build Status](https://travis-ci.org/freddiefujiwara/yoboo.svg?branch=master)](https://travis-ci.org/freddiefujiwara/yoboo)
[![npm version](https://badge.fury.io/js/yoboo.svg)](https://badge.fury.io/js/yoboo)
[![codecov](https://codecov.io/gh/freddiefujiwara/yoboo/branch/master/graph/badge.svg)](https://codecov.io/gh/freddiefujiwara/yoboo)
[![dependencies Status](https://david-dm.org/freddiefujiwara/yoboo/status.svg)](https://david-dm.org/freddiefujiwara/yoboo)

# yoboo
Yaml based task runner

 - you don't need to implement for running some node module

## Requirements

 - Node 7.6 or later

## Installation

```bash
npm i -g yoboo
```

## Usage
```bash
yoboo cat.yaml
```
source code
```yaml
imports:
    - fs
tasks:
    - function: fs.readFileSync
      args:
        - cat.yaml
        - utf-8
      assignTo: file
    - function: console.log
      args:
        - raw: file
```
is going to be compiled to

```js
import fs from 'fs';
async function run(){
        let file=       await fs.readFileSync("cat.yaml","utf-8");
        await console.log(file);
}
run();
```
You can also use other module like [chromeless](https://github.com/graphcool/chromeless):

```yaml
installs:
    - chromeless
imports:
    - chromeless
tasks:
    - function: new chromeless
      noawait: true
      assignTo: ch
    - function: ch.goto
      args:
        - http://www.google.com
    - function: ch.type
      args:
        - yoboo
        - input[name='q']
    - function: ch.press
      args:
        - raw: "13"
    - function: ch.wait
      args:
        - raw: "'#resultStats'"
    - function: ch.screenshot
      assignTo: file
    - function: console.log
      args:
        - raw: file
    - function: ch.end
```
also [chromy](https://github.com/OnetapInc/chromy):

```yaml
installs:
    - chromy
imports:
    - chromy
    - fs
tasks:
    - function: new chromy
      assignTo: ch
      args:
        - raw: "{launchBrowser:false}"
    - function: ch.emulate
      args:
        - iPhone6
    - function: ch.goto
      args:
        - raw: "'https://translate.google.com/#auto/ja/Tokyo'"
    - function: ch.screenshotDocument
      assignTo: png
    - function: fs.writeFileSync
      args:
        - chromy.png
        - raw: png
    - function: ch.close
```

## FAQ

[FAQ](https://github.com/freddiefujiwara/yoboo/wiki/FAQ)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/freddiefujiwara/yoboo

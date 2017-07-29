# yoboo
Yaml based task runner 

 - you don't need to implement for running some node module

## Requirements

 - Node 6 or later

## Installation

```bash
npm i yoboo
```

## Usage
```bash
./node_modules/.bin/yoboo cat.yaml
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
```

You can also use other module like [chromy](https://github.com/OnetapInc/chromy):

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

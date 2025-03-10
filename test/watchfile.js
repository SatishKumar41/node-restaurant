const fs = require('fs');

fs.watch('demo.txt',(evenType, filename)=>{
      if (filename){
        console.log(`changes detetected in file ${filename} : ${evenType}`);
        return;
      }else{
        console.log('No changes detected.');
      }
    });


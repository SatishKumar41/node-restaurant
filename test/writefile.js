const fs= require('fs');

fs.writeFile('demo.txt', 'My name is Satish Thakur, i am here.','utf8', (err)=>{

    if(err){
        console.error(err);
        return;
    }
    console.log('suceessfully done');
});
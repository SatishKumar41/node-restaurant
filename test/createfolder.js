const fs= require('fs');

fs.mkdir('demo', (err)=>{

    if(err){
        console.error(err);
        return;
    }
    console.log('folder created');
});
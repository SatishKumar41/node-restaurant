function divide(a,b){
    return new Promise ((resolve, reject)=>{
        if(b ===0){
            reject("cannot divide by 0");
        }else{
            const result  = a/b;
            resolve(result);
        }
    });
}

/*function b(){
    return new Promise ((resolve, reject)=>{
        resolve(2000);
        console.log('done2');
    });
}

function c(){
    return new Promise ((resolve, reject)=>{
        resolve(2000);
        console.log('done3');
    });
}*/

divide(10,2).then(
    (result)=>{
        console.log('result: ', result);
    }).catch((error)=>{
      console.error(error);
    });
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


async function main(a,b) {
    try {
        const result = await divide(a,b);
        console.log('Result :', result);
    } catch (error) {
        console.error(error);
    }
    
}

main(30,4);

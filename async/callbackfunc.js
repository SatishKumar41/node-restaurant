function step1(callback){
   setTimeout(()=>{
           callback('step 1 result')
   },2000)
}

function step2(res1){
    console.log(res1 + ' & step 2 result');
}


step1(step2);
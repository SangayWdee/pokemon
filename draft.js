// const pattern=(n)=>{
//     for(let x = 1; x<=n; x++){
//       let p = "";
//       for(let i=1; i<=n; i++){
//         p+=" * "
//       }
//     console.log(p)
//     }
//   }


//   pattern(6)


//promises and async/await

function walkDog() {
    return new Promise((resolve, reject)=>{
      const walk = true;
         if(walk){
            setTimeout(()=>{
              resolve("walk the dog!")
            }, 2000)
         }else {
            reject("you didnt walk the dog")
         }
    });
  }
  
  function cleanKitchen() { 
    return new Promise((resolve, reject)=> {
      const clean = true;
        if(clean){
          setTimeout(()=>{
            resolve("Clean the kitchen!")
          }, 3000)
        }else {
          reject("You didnt clean the kitchen")
        }
    });
  }
  
  function trashOut() {
    return new Promise((resolve, reject)=> {
      const trash = false;
          if(trash){
            setTimeout(()=>{
              resolve("Take the trash out!")
            },2000)
          }else{
            reject("you didnt take the trash out")
          }
    })
  }
  
  //without async/await
  
  // walkDog().then(value=>{
  //   console.log(value)
  //   return cleanKitchen();
  // }).then(value=>{
  //   console.log(value)
  //   return trashOut()
  // }).then(value=>{
  //   console.log(value);
  //   console.log("You have completed all the chores")
  // }).catch(error=>console.error(error))
  
  
  //with async/await
  
  async function doChores() {
      try {
        const walkDogResult = await walkDog();
        console.log(walkDogResult)
      
        const cleanKitchenResult = await cleanKitchen();
        console.log(cleanKitchenResult)
      
        const trashOutResult = await trashOut();
        console.log(trashOutResult)
      
        console.log("You have completed all the chores")
      }catch(e){
        console.error(e)
      } 
  }
  
  // doChores();
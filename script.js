// working with api 
//fetch function to fetch data from api
//fetch is promise based, it will either fetch data or give error

//json() is also a promise based, it converts the response into json 

// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//       .then(response => {
//         if(!response.ok){
//           throw new Error("Could not fetch the resource")
//         } else {
//           return response.json();
//         }
//       })
//       .then(data=>console.log(data))
//       .catch(error => console.error(error))

//displaying list of pokemons 
document.addEventListener('DOMContentLoaded', () => {
  // Your code here will execute after the DOM is loaded
  const pokemonNames = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Eevee", "Lucario", "Gengar", "Mewtwo", "Salamence", "Dragonite"];
  let pokemonListElement = document.getElementById("pokemon-list")

  for(const items of pokemonNames){
      const listItemElement = document.createElement("li")
      listItemElement.textContent = items;
      pokemonListElement.appendChild(listItemElement)
  } 
});

//fetchig data from api using async function
async function fetchData() {
  const displayEmptyString = document.getElementById("emptyString");
  const displayError = document.getElementById("errorMsg");
  const imgElement = document.getElementById("pokemonSprite");

  try {
    //clearing the data after every button click initially
    displayEmptyString.style.display = "none";
    displayError.style.display = "none";
    imgElement.style.display = "none";

    // Display loader immediately
    const renderLoader = document.getElementById("loader");
    renderLoader.style.display = "block";
    

    const imgContainer = document.getElementById("image-cotainer")

    // Check for empty input
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    setTimeout(()=>{
      if (!pokemonName) {
        renderLoader.style.display = "none";
        displayEmptyString.style.display = "block";
        throw new Error("Please enter a Pokemon name.");
      }
    },500)

    // Fetch data from API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    // Handle API errors
    if (!response.ok) {
      renderLoader.style.display = "none";
      displayError.style.display = "block";
      throw new Error("Could not fetch Pokemon data. Please check the name and try again.");
    }

    // Process data
    const data = await response.json();
    const pokemon = data.sprites.front_default;
    imgElement.src = pokemon;

    // Hide loader and display image
    setTimeout(()=>{
      renderLoader.style.display = "none";
      imgElement.style.display = "block";
    },500)

    //other details of the pokemon
    let pokemonImages = data.sprites

    const imgArray = []
    const imgLabel = []
    for (const [key, value] of Object.entries(pokemonImages)){
      console.log(key, value)

      if(value !== null){
        imgArray.push(value);
        imgLabel.push(key);
      }
    }

    imgArray.pop();
    imgArray.pop();
    console.log("img",imgArray)
    console.log("label",imgLabel)

    // imgArray.forEach(item => {
    //   console.log(item)
    //   const allImage = document.createElement("img");
    //   allImage.src = item;
    //   allImage.alt = "pokemon image";

    //   imgContainer.appendChild(allImage);
    //   imgContainer.style.display = "block";
    // });

    
    //pagination
    const pageSize = 1;
    console.log('page size', pageSize)
    let currentPage =  1;

    //to display current page content
    const currentPageContent = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, imgArray.length);
      const contentFragment = document.createDocumentFragment();

      for(let i = startIndex; i<endIndex; i++){
        const allImage = document.createElement("img");
        allImage.src = imgArray[i];
        allImage.alt = imgLabel[i];
        allImage.classList.add("more-images");

        contentFragment.appendChild(allImage);
        // imgContainer.style.display = "block";    note: remember to consider this later
      }
      imgContainer.innerHTML = "" //to clear the images whenever the button is clicked again
      imgContainer.appendChild(contentFragment);
    }

    //update pagination
    const updatePagination = (newPage) => {
      const warn = document.getElementById("exceed-warn");

      if(newPage <=0) {
        imgContainer.style.display = "none";
        warn.innerHTML = "Hey, click on next btn!";
      } else if(newPage > Math.ceil(imgArray.length / pageSize)) {
        imgContainer.style.display = "none";
        warn.innerHTML = "Hey, click on previous btn!";
      } else {
        imgContainer.style.display = "block";
        warn.innerHTML = " ";
      }

      // warn.innerHTML = "";

      currentPage = newPage;

      if(newPage > 0 || newPage < Math.ceil(imgArray.length / pageSize)){
        currentPageContent();
      }

    }

    //add event listeners for navigation button 
    document.getElementById('previous-btn').addEventListener('click', () => updatePagination(currentPage - 1));
    document.getElementById('next-btn').addEventListener('click', () => updatePagination(currentPage + 1));

    updatePagination(1);


  } catch (error) {
    console.error(error); // Log errors for debugging
  }
}

fetchData();
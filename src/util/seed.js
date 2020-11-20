const axios = require("axios");

const RANDOM_PERSON_URL = "https://randomuser.me/api";
const RECIPE_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

async function generateSeedArray() {
  try {
      let seedArray = []
    for (let index = 0; index < 3; index++) {
        let dataObject = {};
        const personResponse = await axios.get(RANDOM_PERSON_URL);
        console.log(personResponse.data.results[0])
        dataObject.name = personResponse.data.results[0].name.first;
        dataObject.email = personResponse.data.results[0].email;
        dataObject.password = personResponse.data.results[0].login.password;
        // console.log(dataObject)
        const recipeResponse = await axios.get(RECIPE_URL);
    
        dataObject.recipe = {
          title: recipeResponse.data.meals[0].strMeal,
          instructions: recipeResponse.data.meals[0].strInstructions,
          calories: Math.floor(Math.random() * 1500) + 1,
          imageUrl: recipeResponse.data.meals[0].strMealThumb,
        };
       
        seedArray.push(dataObject)
    }
   console.log(seedArray)
  } catch (error) {
    console.log(error);
  }
}
generateSeedArray();

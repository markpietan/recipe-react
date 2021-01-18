const axios = require("axios");

const RANDOM_PERSON_URL = "https://randomuser.me/api";
const RECIPE_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

async function generateSeedArray() {
  try {
    let seedArray = [];
    for (let index = 0; index < 1; index++) {
      let dataObject = {};
      const personResponse = await axios.get(RANDOM_PERSON_URL);
      console.log(personResponse.data.results[0]);
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
        videoUrl: recipeResponse.data.meals[0].strYoutube,
        area: recipeResponse.data.meals[0].strArea,
        rating: [],
      };

      seedArray.push(dataObject);
    }
    console.log(seedArray);
    for (let index = 0; index < seedArray.length; index++) {
      let currentElement = seedArray[index];
      const user = await axios.post("http://localhost:3001/users", {
       
        name: currentElement.name,
        email: currentElement.email,
        password: currentElement.password,
        favorites: []
      });
      await axios.post("http://localhost:3001/recipes", {
 
        title: currentElement.recipe.title,
        imageUrl: currentElement.recipe.imageUrl,
        calories: currentElement.recipe.calories,
        instructions: currentElement.recipe.instructions,
        userId: user.data.id,
        //replace the word watch with embed on the url 
        videoUrl: currentElement.recipe.videoUrl,
        area: currentElement.recipe.area,
        rating: currentElement.recipe.rating
      });
    }
  } catch (error) {
    console.log(error);
  }
}
generateSeedArray();

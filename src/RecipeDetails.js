import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  Header,
  Loader,
  Image,
  Flag,
  Embed,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipeDetails, setrecipeDetails] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await axios.get("http://localhost:3001/recipes/" + id);
        setrecipeDetails(response.data);
        console.log(response.data);
      } catch (error) {
        throw error;
      }
    }
    getRecipeDetails();
  }, []);

  console.log(id);
  return (
    <Container textAlign="center" text fluid style={{ padding: "2rem" }}>
      {recipeDetails ? (
        <div>
          <Header as="h1">{recipeDetails.title}</Header>
          <Header as="h2">
            {recipeDetails.area}
            <Flag name="morocco"></Flag>
          </Header>
          <Header as="h3">{recipeDetails.calories} calories</Header>
          <Image src={recipeDetails.imageUrl} size="medium"></Image>
          <p>{recipeDetails.instructions}</p>
          <Embed
            id={recipeDetails.videoUrl.slice(
              recipeDetails.videoUrl.indexOf("d/") + 2
            )}
            source="youtube"
          />
        </div>
      ) : (
        <Loader active></Loader>
      )}

      {/* <Grid> 
      </Grid> */}
    </Container>
  );
};

//react.semantic-ui.com/images/avatar/large/matthew.png

export default RecipeDetails;

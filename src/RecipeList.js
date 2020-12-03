import React, { useState, useEffect } from "react";
import "./RecipeList.css";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Grid, Container } from "semantic-ui-react";

const RecipeList = () => {
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    async function getAllRecipes() {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipe(response.data);
      } catch (error) {
        throw error;
      }
    }
    getAllRecipes();
  }, []);
  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Grid columns="3" centered padded="horizontally">
        {recipe.map((e) => {
          return <Grid.Column key={e.id} textAlign="center"> 
          <RecipeCard info= {e}></RecipeCard>
          </Grid.Column>;
        })}
      </Grid>
    </Container>
  );
};

export default RecipeList;

import React, { useState, useEffect } from "react";
import "./RecipeList.css";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import Fuse from "fuse.js";
import {
  Grid,
  Container,
  Form,
  Radio,
  Loader,
  Button,
} from "semantic-ui-react";

const REJECTION_THRESHOLD = 0.3
const RecipeList = () => {
  const [recipe, setRecipe] = useState([]);
  const [title, setTitle] = useState("");
  const [chosenButton, setchosenButton] = useState("");
  const [filteredRecipe, setfilteredRecipe] = useState([]);
  useEffect(() => {
    async function getAllRecipes() {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipe(response.data);
        setfilteredRecipe(response.data);
      } catch (error) {
        throw error;
      }
    }
    getAllRecipes();
  }, []);
  const handleChange = (e, { value }) => {
    setchosenButton(value);
  };
  const handleSubmit = () => {
    if (chosenButton === "Area") {
      let copy = filteredRecipe.slice();
      const options = {
        includeScore: true,
      };
    
      let newArray = copy.filter((recipe) => {
        let areaArray = recipe.area.split(" ")
        const fuse = new Fuse(areaArray, options);
       
        const result = fuse.search(title);
        console.log(result)
        if (recipe.length >= 0 && result[0].score <= REJECTION_THRESHOLD) {
          return true
        } else {
          return false
        }
      });
      console.log(newArray)
    }
  };
  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          fluid
          type=""
          placeholder="Search"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Form.Field>
          <Radio
            label="Area"
            name="filter"
            value="Area"
            checked={chosenButton === "Area"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Calories"
            name="filter"
            value="Calories"
            checked={chosenButton === "Calories"}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Rating"
            name="filter"
            value="Rating"
            checked={chosenButton === "Rating"}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
      <Grid columns="3" centered padded="horizontally">
        {filteredRecipe.length <= 0 ? (
          <Loader active />
        ) : (
          filteredRecipe.map((e) => {
            return (
              <Grid.Column key={e.id} textAlign="center">
                <RecipeCard info={e}></RecipeCard>
              </Grid.Column>
            );
          })
        )}
      </Grid>
    </Container>
  );
};

export default RecipeList;

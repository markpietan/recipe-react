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
  Message,
  Transition,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import useMessage from "./hooks/useMessage";

const REJECTION_THRESHOLD = 0.3;

const RecipeList = () => {
  const [recipe, setRecipe] = useState([]);
  const [title, setTitle] = useState("");
  const [chosenButton, setchosenButton] = useState("");
  const [clickUserInfo, setclickUserInfo] = useState(null);
  const [filteredRecipe, setfilteredRecipe] = useState([]);
  const history = useHistory();
  const [showMessage, messageVisible, hideMessage, messageConfig] = useMessage(
    history
  );
  useEffect(() => {
    if (title === "") {
      setfilteredRecipe(recipe.slice());
    }
  }, [title, recipe]);

  useEffect(() => {
    if (messageVisible === true) {
      window.scrollTo(0, 0);
    }
  }, [messageVisible]);

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const response = await axios.get(
          "https://recipe-app-json-server-backend.herokuapp.com/users/" +
            localStorage.getItem("userId")
        );
        setclickUserInfo(response.data);
      } catch (error) {
        showMessage({
          header: "Getting user profile failed",
          content: error.toString(),
          error: true,
          success: false,
        });
       
        throw error;
      }
    }
    if (localStorage.getItem("userId") !== null) {
      getLoggedInUser();
    }
  }, []);

  useEffect(() => {
    async function getAllRecipes() {
      try {
        const response = await axios.get(
          "https://recipe-app-json-server-backend.herokuapp.com/recipes"
        );
        setRecipe(response.data);
        setfilteredRecipe(response.data);
      } catch (error) {
        showMessage({
          header: "Fetching Recipes Failed",
          content: error.toString(),
          error: true,
          success: false,
        });
   
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
      let copy = recipe.slice();
      const options = {
        includeScore: true,
      };

      let newArray = copy.filter((recipe) => {
        let areaArray = recipe.area.split(" ");
        const fuse = new Fuse(areaArray, options);

        const result = fuse.search(title);

        if (result.length > 0 && result[0].score <= REJECTION_THRESHOLD) {
          return true;
        } else {
          return false;
        }
      });

      setfilteredRecipe(newArray);
    } else if (chosenButton === "Calories") {
      let copy = recipe.slice();

      let newArray = copy.filter((recipe) => {
        if (recipe.calories < Number(title)) {
          return true;
        }
        return false;
      });
      setfilteredRecipe(newArray);
    } else if (chosenButton === "Rating") {
      let copy = recipe.slice();

      let newArray = copy.filter((recipe) => {
        let average = 0;
        recipe.rating.forEach((oneRating) => {
          average += oneRating;
        });
        average = Math.round(average / recipe.rating.length);

        if (!isNaN(average) && average <= Number(title)) {
          return true;
        }
        return false;
      });
      setfilteredRecipe(newArray);
    }
  };

  return (
    <Container as="section" fluid style={{ padding: "2rem" }}>
      <Transition
        duration={2000}
        animation="scale"
        visible={messageVisible}
        unmountOnHide={true}
      >
        <Message
          onDismiss={hideMessage}
          compact
          size="large"
          content={messageConfig.content}
          header={messageConfig.header}
          error={messageConfig.error}
          success={messageConfig.success}
          visible={true}
          hidden={false}
        >
          {/* <Icon name= "ban"></Icon> */}
        </Message>
      </Transition>
      <Form style={{ padding: "20px" }} onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <Form.Input
          fluid
          type=""
          id="search"
          placeholder="Search"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Form.Group grouped>
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
        </Form.Group>
        <Button color="black" type="submit">
          Submit
        </Button>
      </Form>
      <Grid relaxed columns="3" stackable centered padded="horizontally">
        {filteredRecipe.length <= 0 ? (
          <Loader active />
        ) : (
          filteredRecipe.map((e) => {
            return (
              <Grid.Column key={e.id} textAlign="center" stretched={true}>
                <RecipeCard
                  showMessage={showMessage}
                  user={clickUserInfo}
                  info={e}
                ></RecipeCard>
              </Grid.Column>
            );
          })
        )}
      </Grid>
    </Container>
  );
};

export default RecipeList;

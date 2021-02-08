import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeDetails.css";
import {
  Container,
  Header,
  Loader,
  Image,
  Flag,
  Embed,
  Rating,
  Segment,
} from "semantic-ui-react";
import { useParams, Link, useHistory } from "react-router-dom";

const RecipeDetails = () => {
  const [recipeDetails, setrecipeDetails] = useState(null);
  let history = useHistory();
  let { id } = useParams();
  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await axios.get(
          "https://recipe-app-json-server-backend.herokuapp.com/recipes/" + id
        );
        setrecipeDetails(response.data);
      } catch (error) {
        throw error;
      }
    }
    getRecipeDetails();
  }, [id]);
  let averageRating;
  if (recipeDetails) {
    let some = 0;
    for (let index = 0; index < recipeDetails.rating.length; index++) {
      const element = recipeDetails.rating[index];
      some += element;
    }
    averageRating = Math.round(some / recipeDetails.rating.length);
  }
  const [userDetails, setuserDetails] = useState(null);
  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await axios.get(
          "https://recipe-app-json-server-backend.herokuapp.com/users/" +
            recipeDetails.userId
        );
        setuserDetails(response.data);
      } catch (error) {
        throw error;
      }
    }
    if (recipeDetails) {
      getUserDetails();
    }
  }, [recipeDetails]);

  useEffect(() => {
    let user = localStorage.getItem("userId");
    if (user === null) {
      history.push("/404");
    }
  }, [history]);
  return (
    <Container textAlign="center" text fluid style={{ padding: "0rem" }}>
      {recipeDetails && userDetails ? (
        <div>
          <Header color="black" as="h1" size="huge">
            {recipeDetails.title}
          </Header>
          <Header as="h1" size="huge">
            {recipeDetails.area}
          </Header>
          <Header as="h3">{recipeDetails.calories} calories</Header>
          <Rating id= "detailRating" maxRating={5} rating={averageRating} />
          <Image
            wrapped
            style={{ padding: "10px" }}
            src={recipeDetails.imageUrl}
            size="medium"
          ></Image>
          <p style={{ padding: "10px" }}>{recipeDetails.instructions}</p>
          <Embed
            id={recipeDetails.videoUrl.slice(
              recipeDetails.videoUrl.indexOf("=") + 1
            )}
            source="youtube"
          />
          <Link to={"/users/" + userDetails.id}>
            <Segment className="recipeDetailSegment" padded>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                alt="User Icon Image"
                circular
                size="small"
                style={{ padding: "10px" }}
              />
              <h2>Click to Edit or Delete Recipes</h2>
              <div>
                <p>{userDetails.name}</p>
                <Header>{userDetails.email}</Header>
              </div>
            </Segment>
          </Link>
        </div>
      ) : (
        <Loader active></Loader>
      )}

      {/* <Grid> 
      </Grid> */}
    </Container>
  );
};

export default RecipeDetails;

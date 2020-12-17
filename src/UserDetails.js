import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Segment,
  Image,
  Header,
  Container,
  Transition,
} from "semantic-ui-react";

const UserDetails = () => {
  const [userDetails, setuserDetails] = useState(null);
  let id = useParams().id;
  console.log(id);
  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await axios.get("http://localhost:3001/users/" + id);
        setuserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        throw error;
      }
    }
    getUserDetails();
  }, []);
  const [recipeUser, setrecipeUser] = useState(null);
  useEffect(() => {
    async function getUserRecipes() {
      try {
        const response = await axios.get(
          "http://localhost:3001/recipes?userId=" + id
        );
        setrecipeUser(response.data);
        console.log(response.data);
      } catch (error) {
        throw error;
      }
    }
    getUserRecipes();
  }, []);

  return (
    <Container>
      <Segment
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        padded
      >
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          circular
          size="small"
        />
        {userDetails ? (
          <div>
            <p>{userDetails.name}</p>
            <Header>{userDetails.email}</Header>
          </div>
        ) : null}
      </Segment>

      <Segment.Group>
        {recipeUser &&
          recipeUser.map((recipe) => {
            return (
              <Transition animation="fade" duration={500} visible>
                <Link to={"/recipes/" + recipe.id}>
                  <Segment
                    size="large"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Image src={recipe.imageUrl} size="small"></Image>
                    <p>{recipe.title}</p>
                    <p>{recipe.area}</p>
                    <p>{recipe.calories}</p>
                    {/* <p>{recipe.}</p> */}
                  </Segment>
                </Link>
              </Transition>
            );
          })}
      </Segment.Group>
    </Container>
  );
};

export default UserDetails;

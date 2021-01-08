import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  Segment,
  Image,
  Header,
  Container,
  Transition,
  Loader,
  Button,
} from "semantic-ui-react";

const UserDetails = ({ user }) => {
  const [userDetails, setuserDetails] = useState(null);
  let id = useParams().id;
  let history = useHistory();
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
        setVisible(true);
        console.log(response.data);
      } catch (error) {
        throw error;
      }
    }
    getUserRecipes();
  }, []);

  useEffect(() => {
    let user = localStorage.getItem("userId")
    if (user === null) {
      history.push("/404")
    }

  }, [])
  const [visible, setVisible] = useState(false);

  async function handleDelete(recipeId) {
    try {
      const response = await axios.delete(
        "http://localhost:3001/recipes/" + recipeId
      );
      let newArray = recipeUser.filter((recipe) => {
        if (recipe.id === recipeId) {
          return false;
        } else {
          return true;
        }
      });
      setrecipeUser(newArray)
    } catch (error) {}
  }
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
        ) : (
          <Loader active />
        )}
      </Segment>

      <Segment.Group>
        {recipeUser &&
          recipeUser.map((recipe) => {
            return (
              <Transition animation="scale" duration={500} visible={visible}>
               
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
                    <Link to={"/recipes/" + recipe.id}>
                    <p>{recipe.title}</p>
                    </Link>
                    <p>{recipe.area}</p>
                    <p>{recipe.calories}</p>
                    {user === id ? (
                      <div>
                        <Link to= {`/recipes/edit/${recipe.id}`}>
                        <Button center="">Edit</Button>
                        </Link>
                        <Button
                          onClick={() => {
                            handleDelete(recipe.id);
                          }}
                          center=""
                        >
                          Delete
                        </Button>
                      </div>
                    ) : null}

                    {/* <p>{recipe.}</p> */}
                  </Segment>
                
              </Transition>
            );
          })}
      </Segment.Group>
    </Container>
  );
};

export default UserDetails;

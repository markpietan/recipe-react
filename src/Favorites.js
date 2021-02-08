import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import qs from "qs";
import { Item, Button } from "semantic-ui-react";
import "./Favorites.css";
const Favorites = () => {
  const [favoritesList, setfavoritesList] = useState([]);
  const [favoriteData, setfavoriteData] = useState([]);
  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const response = await axios.get(
          "https://recipe-app-json-server-backend.herokuapp.com/users/" + localStorage.getItem("userId")
        );
        setfavoritesList(response.data.favorites);
      } catch (error) {
        throw error;
      }
    }
    if (localStorage.getItem("userId") !== null) {
      getLoggedInUser();
    }
  }, []);
  useEffect(() => {
    async function getUserFavorites() {
      try {
        const response = await axios.get("https://recipe-app-json-server-backend.herokuapp.com/recipes", {
          params: {
            id: favoritesList,
          },
          paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: "brackets" });
          },
        });
        setfavoriteData(response.data);
      } catch (error) {
        throw error;
      }
    }
    if (favoritesList !== null) {
      getUserFavorites();
    }
  }, [favoritesList]);

  return (
    <Item.Group divided relaxed="very" id="favorites">
      {favoriteData.map((e) => {
        return (
          <Item style={{textAlign: "center"}} >
            <Item.Image size="tiny" src={e.imageUrl} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="a">{e.title}</Item.Header>
              <p>{e.area}</p>
              <Item.Meta>
                <Button>
                  <Link to={`/recipes/${e.id}`}> Details Page</Link>
                </Button>
              </Item.Meta>
            </Item.Content>
          </Item>
        );
      })}
    </Item.Group>
  );
};

export default Favorites;

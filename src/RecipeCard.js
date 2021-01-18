import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Rating,
  Button,
  Modal,
  Header,
  Image,
  Card,
  Icon,
  Transition,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import RecipeAdd from "./RecipeAdd";

const RecipeCard = ({ info, user, setmessageConfig, setmessageVisible }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
   // const [error, setError] = useState(false)
  
  const [favoriteClicked, setfavoriteClicked] = useState(false);
  useEffect(() => {
    setVisible(true);
    if (user) {
      const inFavorites = user.favorites.find((recipeId) => {
        if (info.id === recipeId) {
          return true;
        } else {
          return false;
        }
      });
      if (inFavorites) {
        setfavoriteClicked(true);
      }
    }
   
  }, []);
  // const ratings = info.rating

  let some = 0;
  for (let index = 0; index < info.rating.length; index++) {
    const element = info.rating[index];
    some += element;
  }
  async function handleRate(e, { rating }) {
    try {
      const ratingArray = [...info.rating];
      ratingArray.push(rating);
      const response = await axios.patch(
        "http://localhost:3001/recipes/" + info.id,
        {
          rating: ratingArray,
        }
      );
      console.log("Submitted Ratings");
      setmessageVisible(true);
      //put message here
      setmessageConfig({
        header: "Ratings successfully submitted",
        content: "",
        error: false,
        success: true,
      });
      setTimeout(() => {
        setmessageConfig({
          header: "",
          content: "",
          error: false,
          success: false,
        });
        setmessageVisible(false);
      }, 2000);
    } catch (error) {
      setmessageVisible(true);
      //put message here
      setmessageConfig({
        header: "Rating failed",
        content: error.toString(),
        error: true,
        success: false,
      });
      setTimeout(() => {
        setmessageConfig({
          header: "",
          content: "",
          error: false,
          success: false,
        });
        setmessageVisible(false);
      }, 2000);
      throw error;
    }
  }
  async function handleAddFavorite() {
    try {
      let currentFavorites = user.favorites;
      currentFavorites.push(info.id);
      const mySet = new Set(currentFavorites);
      const finalArray = Array.from(mySet);
      const response = await axios.patch(
        "http://localhost:3001/users/" + user.id,
        {
          favorites: finalArray,
        }
      );
      console.log(currentFavorites);
      setmessageVisible(true);
      //put message here
      setmessageConfig({
        header: "Successfully added to Favorites",
        content: `Added ${info.title} to favorites`,
        error: false,
        success: true,
      });
      setTimeout(() => {
        setmessageConfig({
          header: "",
          content: "",
          error: false,
          success: false,
        });
        setmessageVisible(false);
      }, 2000);
    } catch (error) {
      setmessageVisible(true);
      //put message here
      setmessageConfig({
        header: "Setting favorites failed",
        content: error.toString(),
        error: true,
        success: false,
      });
      setTimeout(() => {
        setmessageConfig({
          header: "",
          content: "",
          error: false,
          success: false,
        });
        setmessageVisible(false);
      }, 2000);
      throw error;
    }
  }
  async function handleRemoveFavorite() {
    try {
      let currentFavorites = user.favorites;
      currentFavorites = currentFavorites.filter((recipeId) => {
        if (info.id === recipeId) {
          return false;
        } else {
          return true;
        }
      });
      const mySet = new Set(currentFavorites);
      const finalArray = Array.from(mySet);
      const response = await axios.patch(
        "http://localhost:3001/users/" + user.id,
        {
          favorites: finalArray,
        }
      );
      console.log(currentFavorites);
    } catch (error) {
      throw error;
    }
  }
  const averageRating = Math.round(some / info.rating.length);
  return (
    <Transition animation="swing down" visible={visible} duration={500}>
      <Card>
        <Image src={info.imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{info.title}</Card.Header>
          <Card.Meta style={{}}>{info.calories}</Card.Meta>

          <Card.Description className="description">
            {" "}
            {info.instructions}
          </Card.Description>
          <Modal
            style={{ padding: "20px" }}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color="black">Click Here</Button>}
          >
            {" "}
            <Modal.Header>{info.title}</Modal.Header>
            <Modal.Content image>
              <Image size="large" src={info.imageUrl} wrapped />
              <Modal.Description>
                <Header>{info.calories} calories</Header>
                <p>{info.instructions}</p>
                <iframe
                  title="video"
                  width="560"
                  height="315"
                  src={info.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* <image>{info.}</image> */}
              </Modal.Description>
              <div></div>
            </Modal.Content>
          </Modal>
        
          {user === null ? 
             null : 
             <Link to={"/recipes/" + info.id}>
             <Button color="black" style={{ padding: "10px" }}>
               Details Page
             </Button>
             </Link>}
      
        </Card.Content>
        <Card.Content extra>
          <div>
            {user === null ? (
              <>
                <Rating
                  disabled
                  maxRating={5}
                  clearable
                  rating={averageRating}
                  onRate={handleRate}
                />
                <Icon
                  disabled
                  color={favoriteClicked ? "red" : "grey"}
                  onClick={(e) => {
                    setfavoriteClicked(!favoriteClicked);
                    if (favoriteClicked === false) {
                      handleAddFavorite();
                    } else {
                      handleRemoveFavorite();
                    }
                  }}
                  name="like"
                ></Icon>
              </>
            ) : (
              <>
                <Rating
                  maxRating={5}
                  clearable
                  rating={averageRating}
                  onRate={handleRate}
                />
                <Icon
                  color={favoriteClicked ? "red" : "grey"}
                  onClick={(e) => {
                    setfavoriteClicked(!favoriteClicked);
                    if (favoriteClicked === false) {
                      handleAddFavorite();
                    } else {
                      handleRemoveFavorite();
                    }
                  }}
                  name="like"
                ></Icon>
              </>
            )}
          </div>

        </Card.Content>
      </Card>
    </Transition>
  );
};

export default RecipeCard;

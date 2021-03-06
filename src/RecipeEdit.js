import React, { useState, useEffect } from "react";
import {
  Form,
  Segment,
  Header,
  Icon,
  TextArea,
  Button,
} from "semantic-ui-react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const RecipeEdit = () => {
  const [imageUrl, setimageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState([]);
  const [calories, setCalories] = useState("");
  const [instructions, setInstructions] = useState("");
  const [area, setArea] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  let history = useHistory();
  let id = useParams().id;
  useEffect(() => {
    let user = localStorage.getItem("userId");
    if (user === null) {
      history.push("/404");
    }
  }, [history]);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await axios.get(
          "https://recipe-app-json-server-backend.herokuapp.com/recipes" + id
        );
        setTitle(response.data.title);
        setCalories(response.data.calories);
        setimageUrl(response.data.imageUrl);
        setInstructions(response.data.instructions);
        setArea(response.data.area);
        setvideoUrl(response.data.videoUrl);
        setRating(response.data.rating);
      } catch (error) {
        throw error;
      }
    }
    getRecipeDetails();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        "https://recipe-app-json-server-backend.herokuapp.com/recipes" + id,
        {
          userId: Number(localStorage.getItem("userId")),
          title: title,
          imageUrl: imageUrl,
          calories: calories,
          instructions: instructions,
          rating: rating,
          area: area,
        }
      );

      history.push("/");
    } catch (error) {}
  };
  return (
    // <Grid columns={3} divided>
    // <Grid.Row>
    //   <Grid.Column>
    <>
      <Header as="h2" color="teal" textAlign="center">
        <Icon name="food"></Icon>
        Enter a new recipe
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            type=""
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextArea
            placeholder="Recipe Instructions"
            value={instructions}
            onChange={(e) => {
              setInstructions(e.target.value);
            }}
          />
          <Form.Input
            fluid
            placeholder="Calories"
            type=""
            value={calories}
            onChange={(e) => {
              setCalories(e.target.value);
            }}
          />
          <Form.Input
            fluid
            placeholder="Image Url"
            type=""
            value={imageUrl}
            onChange={(e) => {
              setimageUrl(e.target.value);
            }}
          />
          <Form.Input
            fluid
            placeholder="Area"
            type=""
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />{" "}
          <Form.Input
            fluid
            placeholder="Video Url"
            type=""
            value={videoUrl}
            onChange={(e) => {
              setvideoUrl(e.target.value);
            }}
          />
        </Segment>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default RecipeEdit;

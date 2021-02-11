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
import { useHistory } from "react-router-dom";

const RecipeAdd = () => {
  const [imageUrl, setimageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [instructions, setInstructions] = useState("");
  const [area, setArea] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  let history = useHistory();

  useEffect(() => {
    let user = localStorage.getItem("userId");
    if (user === null) {
      history.push("/404");
    }
  }, [history]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://recipe-app-json-server-backend.herokuapp.com/recipes",
        {
          userId: Number(localStorage.getItem("userId")),
          title: title,
          imageUrl: imageUrl,
          calories: calories,
          instructions: instructions,
          rating: [],
          area: area,
        }
      );

      history.push("/");
    } catch (error) {}
  };
  return (
    <>
      <Header as="h2" color="teal" textAlign="center">
        <Icon name="food"></Icon>
        Enter a new recipe
      </Header>
      <Form style={{ padding: "15px" }} onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            required
            fluid
            type=""
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextArea
            required
            style={{ padding: "14px" }}
            placeholder="Recipe Instructions"
            value={instructions}
            onChange={(e) => {
              setInstructions(e.target.value);
            }}
          />
          <Form.Input
            required
            fluid
            style={{ padding: "4px" }}
            placeholder="Calories"
            type=""
            value={calories}
            onChange={(e) => {
              setCalories(e.target.value);
            }}
          />
          <Form.Input
            required
            fluid
            placeholder="Image Url"
            type=""
            value={imageUrl}
            onChange={(e) => {
              setimageUrl(e.target.value);
            }}
          />
          <Form.Input
            required
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
        <Button color="black" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RecipeAdd;

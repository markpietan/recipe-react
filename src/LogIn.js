import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const LoginForm = ({ registration, setUser }) => {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("");
  let history = useHistory();

  const onChange = (e) => {
    console.log("Hello");
    setuserName(e.target.value);
  };
  const onSubmitRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users", {
        name: "",
        password: passWord,
        email: userName,
        favorites: [],
      });
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: {
          email: userName,
          password: passWord,
        },
      });
      console.log(response);
      if (response.data.length > 0) {
        console.log("Successfully Logged-in")
        localStorage.setItem("userId", response.data[0].id.toString())
        setUser(response.data[0].id.toString())
        history.push("/")
      } else {
        console.log("Failed Log-in")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="user"></Icon>
          {registration === true ? "Please register" : "Log in to your account"}
        </Header>
        <Form
          size="large"
          onSubmit={
            registration === true ? onSubmitRegistration : onSubmitLogin
          }
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={userName}
              onChange={onChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={passWord}
              onChange={(e) => {
                setpassWord(e.target.value);
              }}
            />
            <Button color="teal" fluid size="large">
              {registration === true ? "Register" : "Log in"}
            </Button>
          </Segment>
        </Form>
        {registration === true ? null : (
          <Message>
            New to us? <Link to="/registration">Sign Up</Link>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;

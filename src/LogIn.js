import React, { useState } from "react";
import useMessage from "./hooks/useMessage";
import {
  Button,
  Form,
  Transition,
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
  const [showMessage, messageVisible, hideMessage, messageConfig] = useMessage(
    history
  );

  const onChange = (e) => {
    setuserName(e.target.value);
  };
  const onSubmitRegistration = async (e) => {
    e.preventDefault();
    try {
     await axios.post(
        "https://recipe-app-json-server-backend.herokuapp.com/users",
        {
          name: "",
          password: passWord,
          email: userName,
          favorites: [],
        }
      );

      showMessage(
        {
          header: "Registration Successful",
          content: "Successfully created user " + userName,
          error: false,
          success: true,
        },
        "/"
      );
    } catch (error) {
      showMessage({
        header: "Registration Failed",
        content: error.toString(),
        error: true,
        success: false,
      });
    }
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://recipe-app-json-server-backend.herokuapp.com/users?email=userName&password=passWord",
        {
          params: {
            email: userName,
            password: passWord,
          },
        }
      );

      if (response.data.length > 0) {
        localStorage.setItem("userId", response.data[0].id.toString());
        setUser(response.data[0].id.toString());
        showMessage(
          {
            header: "Logged-in Successfully",
            content: "",
            error: false,
            success: true,
          },
          "/"
        );
      } else {
        showMessage({
          header: "Log-in Failed",
          content: "Please try again",
          error: true,
          success: false,
        });
      }
    } catch (error) {
      showMessage({
        header: "Log-in Failed",
        content: error.toString(),
        error: true,
        success: false,
      });
    }
  };
  return (
    <>
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
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column mobile="10" style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Icon name="user"></Icon>
            {registration === true
              ? "Please register"
              : "Log in to your account"}
          </Header>
          <Form
            size="large"
            onSubmit={
              registration === true ? onSubmitRegistration : onSubmitLogin
            }
          >
            <Segment stacked>
              <label htmlFor="e-mail">E-mail</label>
              <Form.Input
                required
                id="e-mail"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={userName}
                onChange={onChange}
              />
              <Form.Input
                required
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
    </>
  );
};

export default LoginForm;

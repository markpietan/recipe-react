import React, { useEffect, useState } from "react";
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
  // const [error, setError] = useState(false)
  const [messageVisible, setmessageVisible] = useState(false);
  const [messageConfig, setmessageConfig] = useState({
    header: "",
    content: "",
    error: false,
    success: false,
  });
  const [passWord, setpassWord] = useState("");
  let history = useHistory();
  // useEffect(() => {
  //   const timer = setTimeout(()=> {
  //    setmessageVisible(false)
  //   }, 1000)
  // },[error])
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
      setmessageVisible(true);
      //put message here
      setmessageConfig({
        header: "Registration Successful",
        content: "Successfully created user " + userName,
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
        history.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      console.log(typeof error);
      setmessageVisible(true);
      //put message here
      setmessageConfig({
        header: "Registration Failed",
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
    }
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3001/users?email=userName&password=passWord",
        {
          params: {
            email: userName,
            password: passWord,
          },
        }
      );
      console.log(response);
      if (response.data.length > 0) {
        console.log("Successfully Logged-in");
        localStorage.setItem("userId", response.data[0].id.toString());
        setUser(response.data[0].id.toString());
        setmessageVisible(true);
        //put message here
        setmessageConfig({
          header: "Logged-in Successfully",
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
          history.push("/");
        }, 2000);
      } else {
        console.log("Failed Log-in");
        setmessageVisible(true);
        //put message here
        setmessageConfig({
          header: "Log-in Failed",
          content: "Please try again",
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
      }
    } catch (error) {
      console.log(error);
      setmessageVisible(true);
      //put message here
      setmessageConfig({
        header: "Log-in Failed",
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
          onDismiss={() => {
            setmessageConfig({
              header: "",
              content: "",
              error: false,
              success: false,
            });
            setmessageVisible(false);
          }}
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
        <Grid.Column style={{ maxWidth: 450 }}>
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
    </>
  );
};

export default LoginForm;

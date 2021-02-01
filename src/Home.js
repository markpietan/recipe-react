import React, { useState, useEffect } from "react";
import { Button, Header, Grid, Image, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section>
      <div className="hero">
        {/* <Transition duration={500} animation="zoom" visible={visible}> */}
        <div className="hero-content">
          <Header size="huge" className="hero-title">
            Recipe App
          </Header>
          <Header textAlign="center" color="white" size="large" className="hero-subtitle">
            Create and Organize new and favorite recipes!
          </Header>
          <Button onClick={() => {
            console.log("clicked")
          }}className="call">
            <Link to="/registration">Sign Up Today</Link>
          </Button>
        </div>
        {/* </Transition> */}
      </div>
      <article className="article">
        <Grid padded columns="equal">
          <Grid.Column>
            <Image
              size="small"
              alt="Cooking image"
              src="https://www.flaticon.com/svg/static/icons/svg/2917/2917633.svg"
            ></Image>

            <p>Create new recipes and organize favorite recipes!</p>
          </Grid.Column>
          <Grid.Column>
            <Image
              size="small"
              alt="Cooking image"
              src="https://www.flaticon.com/svg/static/icons/svg/706/706195.svg"
            ></Image>
            <p>Post and access Youtube recipe-instructional videos!</p>
          </Grid.Column>
          <Grid.Column>
            <Image
              size="small"
              alt="Cooking image"
              src="https://www.flaticon.com/svg/static/icons/svg/3082/3082055.svg"
            ></Image>
            <p>Search recipes by country, calories amount, and by favorites!</p>
          </Grid.Column>
          <Grid.Column>
            <Image
              size="small"
              alt="Cooking image"
              src="https://www.flaticon.com/svg/static/icons/svg/1261/1261163.svg"
            ></Image>
            <p>Rate recipes to keep track of all the best ones!</p>
          </Grid.Column>
        </Grid>
      </article>
    </section>
  );
};
export default Home;

// import React from 'react'
// import { Image } from 'semantic-ui-react'

// const ImageExampleFluid = () => (
//   <Image src='/images/wireframe/image.png' fluid />
// )

// export default ImageExampleFluid
// src={src} size='massive'

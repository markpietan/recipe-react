import React, { useState, useEffect } from "react";
import { Button, Header, Grid, Image, Transition } from "semantic-ui-react";
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
            <Header color="white" size="large" className="hero-subtitle">
              Create and Organize new and favorite recipes!
            </Header>
            <Button className="call">Sign Up Today</Button>
          </div>
        {/* </Transition> */}
      </div>
      <article>
        <Grid padded columns="equal">
          <Grid.Column>
            <Image src="https://www.flaticon.com/svg/static/icons/svg/2917/2917633.svg"></Image>
            
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quod
              animi nisi adipisci odio sed ullam nobis est illo. Quis nulla sunt
              accusantium placeat est? Laudantium assumenda libero tempora
              porro!
            </p>
          </Grid.Column>
          <Grid.Column>
            <Image src="https://www.flaticon.com/svg/static/icons/svg/706/706195.svg"></Image>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quod
              animi nisi adipisci odio sed ullam nobis est illo. Quis nulla sunt
              accusantium placeat est? Laudantium assumenda libero tempora
              porro!
            </p>
          </Grid.Column>
          <Grid.Column>
            <Image src="https://www.flaticon.com/svg/static/icons/svg/3082/3082055.svg"></Image>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quod
              animi nisi adipisci odio sed ullam nobis est illo. Quis nulla sunt
              accusantium placeat est? Laudantium assumenda libero tempora
              porro!
            </p>
          </Grid.Column>
          <Grid.Column>
            <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></Image>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quod
              animi nisi adipisci odio sed ullam nobis est illo. Quis nulla sunt
              accusantium placeat est? Laudantium assumenda libero tempora
              porro!
            </p>
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

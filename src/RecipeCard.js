import React, { useState } from "react";
import axios from "axios"
import {
  Rating,
  Button,
  Modal,
  Header,
  Image,
  Card,
  Icon,
} from "semantic-ui-react";
import RecipeAdd from "./RecipeAdd";

const RecipeCard = ({info}) => {
  const [open, setOpen] = useState(false);
  // const ratings = info.rating
  console.log(info)
  let some = 0
  for (let index = 0; index < info.rating.length; index++) {
    const element = info.rating[index];
    some+= element 
  }
  async function handleRate(e, {rating}){
    try {
      const ratingArray = [...info.rating]
      ratingArray.push(rating)
      const response = await axios.patch("http://localhost:3001/recipes/"+ info.id, {
        rating: ratingArray
      })
      console.log("Submitted Ratings")
    } catch (error) {
      throw(error)
    }
  }
  const averageRating = Math.round(some/info.rating.length)
  return (
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
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Click Here</Button>}
        >
          {" "}
          <Modal.Header>{info.title}</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={info.imageUrl} wrapped />
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
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Rating maxRating={5} clearable rating= {averageRating} onRate={handleRate}/>
         
          
        </div>

        <a>
          <Icon name="user" />
          10 Friends
        </a>
      </Card.Content>
    </Card>
  );
};

export default RecipeCard;

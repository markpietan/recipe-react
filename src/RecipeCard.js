import React, { useState } from "react";
import {
  Rating,
  Button,
  Modal,
  Header,
  Image,
  Card,
  Icon,
} from "semantic-ui-react";

const RecipeCard = ({info}) => {
  const [open, setOpen] = useState(false);
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
                src="https://www.youtubinfo.com/embed/9h9No18ZyCI"
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
          <Rating maxRating={5} clearable />
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

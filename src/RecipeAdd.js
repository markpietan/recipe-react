import React, {useState} from 'react'
import { Form, Segment, Grid, Image, Header, Icon, TextArea, Button } from 'semantic-ui-react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const RecipeAdd = () => {
   
        const [imageUrl, setimageUrl] = useState("");
        const [title, setTitle] = useState("");
        const [calories, setCalories] = useState("");
        const [instructions, setInstructions] = useState("");
        let history = useHistory();
       
      
      
        const onSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post("http://localhost:3001/recipes", {

                    "userId": 1,
                    "title": title,
                    "imageUrl": imageUrl,
                    "calories": calories,
                    "instructions": instructions
                  }
            );
            console.log(response)
            history.push("/")
          } catch (error) {
            console.log(error);
          }
          }
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
              type= ""
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextArea placeholder='Recipe Instructions' 
             value={instructions}
             onChange={(e) => {
                setInstructions(e.target.value);
              }}
            />
            {/* <Form.Input
              fluid
              
              placeholder="Instructions"
              type= ""
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
            /> */}
            <Form.Input
              fluid
              
              placeholder="Calories"
              type= ""
              value={calories}
              onChange={(e) => {
                setCalories(e.target.value);
              }}
            />
            <Form.Input
              fluid
              
              placeholder="Image Url"
              type= ""
              value={imageUrl}
              onChange={(e) => {
                setimageUrl(e.target.value);
        
              }}
            />
           
          </Segment>
          <Button type= 'submit'>Submit</Button>
        </Form>
        </>
          )
              {/* </Grid.Column>
              <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
              </Grid.Column>
              <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
              </Grid.Column>
            </Grid.Row>
        
            <Grid.Row>
              <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
              </Grid.Column>
              <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
              </Grid.Column>
              <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
          
        };
    
        export default RecipeAdd
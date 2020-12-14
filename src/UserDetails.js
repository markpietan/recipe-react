import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Segment, Image, Header} from "semantic-ui-react"

const UserDetails = () => {
  const [userDetails, setuserDetails] = useState(null);
  let id =  useParams().id;
  console.log(id)
  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await axios.get("http://localhost:3001/users/" + id);
        setuserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        throw error;
      }
    }
    getUserDetails();
  }, []);
  return (
    <Segment
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
    padded
  >
    <Image
      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
      circular
      size="small"
    />
    {userDetails ?  
    <div>
      <p>{userDetails.name}</p>
      <Header>{userDetails.email}</Header>
    </div> : null
    } 
  </Segment>
  )
};

export default UserDetails;

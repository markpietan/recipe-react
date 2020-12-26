import "./App.css";
import NavBar from "./NavBar";
import "semantic-ui-css/semantic.min.css";
import { Route, useParams } from "react-router-dom";
import LogIn from "./LogIn";
import Home from "./Home";
import RecipeList from "./RecipeList";
import RecipeAdd from "./RecipeAdd";
import React, {useState} from 'react'
import Favorites from "./Favorites"
import RecipeDetails from "./RecipeDetails"
import UserDetails from "./UserDetails"

function App() {
const [user, setUser] = useState('')
  return (
    <main>
      <NavBar className="nav-color" setUser= {setUser} user= {user}></NavBar>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/recipe-add">
        <RecipeAdd></RecipeAdd>
      </Route>
      <Route exact path="/recipes">
        <RecipeList></RecipeList>
       
      </Route>
      <Route path='/favorites'>
        <Favorites></Favorites>
      </Route>
      <Route path='/users/:id'>
        <UserDetails></UserDetails>
      </Route>
      <Route path="/recipes/:id">
          <RecipeDetails></RecipeDetails> 
        </Route>
      <Route path="/login">
        <LogIn setUser= {setUser} registration={false}></LogIn>
      </Route>
      <Route path="/registration">
        <LogIn registration={true}></LogIn>
      </Route>
    </main>
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export default App;

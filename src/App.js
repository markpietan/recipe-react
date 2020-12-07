import "./App.css";
import NavBar from "./NavBar";
import "semantic-ui-css/semantic.min.css";
import { Route } from "react-router-dom";
import LogIn from "./LogIn";
import Home from "./Home";
import RecipeList from "./RecipeList";
import RecipeAdd from "./RecipeAdd";
import React, {useState} from 'react'
import Favorites from "./Favorites"

function App() {
const [user, setUser] = useState('')
  return (
    <main>
      <NavBar setUser= {setUser} user= {user}></NavBar>
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
      <Route path="/recipes/:id">
          Hello
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

export default App;

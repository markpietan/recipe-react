import "./App.css";
import NavBar from "./NavBar";
import "semantic-ui-css/semantic.min.css";
import { Route, Switch } from "react-router-dom";
import LogIn from "./LogIn";
import Home from "./Home";
import RecipeList from "./RecipeList";
import RecipeAdd from "./RecipeAdd";
import React, {useEffect, useState} from 'react'
import Favorites from "./Favorites"
import RecipeDetails from "./RecipeDetails"
import UserDetails from "./UserDetails"
import PageNotFound from "./404";
import RecipeEdit from "./RecipeEdit";

function App() {
const [user, setUser] = useState('')
useEffect(()=> {
   let response = localStorage.getItem("userId")
  if (response !== null) {
    setUser(response)
  } 
}, [])
  return (
    <main>
      <NavBar className="nav-color" setUser= {setUser} user= {user}></NavBar>
      <Switch>
        <Route path="/recipes/edit/:id" >
           <RecipeEdit></RecipeEdit>
        </Route>
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
        <UserDetails user= {user}></UserDetails>
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
      <Route>
        <PageNotFound></PageNotFound>
      </Route>
      </Switch>
    </main>
  );
}



export default App;

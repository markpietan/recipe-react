import "./App.css";
import NavBar from "./NavBar";
import "semantic-ui-css/semantic.min.css";
import { Route } from "react-router-dom";
import LogIn from "./LogIn";
import Home from "./Home";
// import RecipeList from "./RecipeList";
import RecipeAdd from "./RecipeAdd";

function App() {
  return (
    <main>
      <NavBar></NavBar>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/recipe-add">
        <RecipeAdd></RecipeAdd>
      </Route>
      {/* <Route path="/recipes">
        <RecipeAdd></RecipeAdd>
      </Route> */}

      <Route path="/login">
        <LogIn registration={false}></LogIn>
      </Route>
      <Route path="/registration">
        <LogIn registration={true}></LogIn>
      </Route>
    </main>
  );
}

export default App;

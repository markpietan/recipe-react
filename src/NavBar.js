import React, { useState } from "react";
import { Button, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";


function NavBar() {
  const [activeItem, setactiveItem] = useState("");
  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
  };
  return (
    <nav>
      <Menu inverted>
      <Menu.Item
          name=""
          active={activeItem === ""}
          onClick={handleItemClick}
        >
          <Link to="/"><Icon name= "food"></Icon></Link>
        </Menu.Item>

        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={handleItemClick}
        >
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item
          name="Recipe List"
          active={activeItem === "Recipe List"}
          onClick={handleItemClick}
        >
          <Link to="/recipes">Recipe List</Link>
        </Menu.Item>

        <Menu.Item
          name="Log In"
          active={activeItem === "Log In"}
          position="right"
          onClick={handleItemClick}
        >
          <Link to="/login">Log In</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default NavBar;

import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ user, setUser }) {
  const [activeItem, setactiveItem] = useState("");
  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
  };

  return (
    <nav>
      <Menu inverted color="black" id="myMenu">
        <Menu.Item
          as="div"
          name=""
          active={activeItem === ""}
          onClick={handleItemClick}
        >
          <Link to="/">
            <Icon name="food"></Icon>
          </Link>
        </Menu.Item>
        {user === "" ? (
          <Menu.Item
            as="div"
            name="Home"
            active={activeItem === "Home"}
            onClick={handleItemClick}
          >
            <Link to="/">Home</Link>
          </Menu.Item>
        ) : null}

        <Menu.Item
          as="div"
          name="Recipe List"
          active={activeItem === "Recipe List"}
          onClick={handleItemClick}
        >
          <Link to="/recipes">Recipe List</Link>
        </Menu.Item>
        {user !== "" ? (
          <Menu.Item
            as="div"
            name="Recipe Add"
            active={activeItem === "Recipe Add"}
            onClick={handleItemClick}
          >
            <Link to="/recipe-add">Recipe Add</Link>
          </Menu.Item>
        ) : null}

        {user !== "" ? (
          <Menu.Item
            as="div"
            name="Favorites"
            active={activeItem === "Favorites"}
            onClick={handleItemClick}
          >
            <Link to="/favorites">Favorites</Link>
          </Menu.Item>
        ) : null}

        <Menu.Item
          as="div"
          name="Log In"
          active={activeItem === "Log In"}
          onClick={handleItemClick}
        >
          {user !== "" ? (
            <Link
              to="/"
              onClick={() => {
                setUser("");
                localStorage.clear();
              }}
            >
              Log Out
            </Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default NavBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

// navbar component receives setUser from App.js
function NavBar({ setUser }) {
  // helper state for functionality of Hamburger style component
  const [isOpen, setIsOpen] = useState(false);
  // onClick function that handles the log out by deleting the session in the backend and sets user to null
  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">Arteaga Real Estate</Link>
      </Logo>
      <Nav>
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu isOpen={isOpen}>
          <MenuLink as={Link} to="/new">
            <Button variant="outline">Add New House</Button>
          </MenuLink>
          <MenuLink as={Link} to="/about">
            <Button variant="outline">About</Button>
          </MenuLink>
          <MenuLink onClick={handleLogout}>
            {" "}
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </MenuLink>
        </Menu>
      </Nav>
    </Wrapper>
  );
}
// @media a css conditional that checks if a condition is true then proceeds to the next block
const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: goldenrod;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuLink = styled.a`
  padding: 0.2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height: 0.3s ease-in;
  }
`;

const Wrapper = styled.header`
padding: 2px;
display: flex;
justify_content: space-between;
align-items: center;
flex-wrap; wrap;

`;

const Logo = styled.h1`
  font-family: cursive;
  display: flex;
  font-size: 3rem;
  color: goldenrod;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import DarkThemeButton from "../styles/DarkThemeButton.js";

function NavBar({ setUser, toggleTheme, setTheme, isDarkTheme }) {
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
        <Button variant="outline" as={Link} to="/new">
          Add New House
        </Button>
        <Button variant="outline" as={Link} to="/about">
          About
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <DarkThemeButton onClick={toggleTheme}>
          {isDarkTheme ? (
            <span aria-label="Light mode" role="img">
              🌞
            </span>
          ) : (
            <span aria-label="Dark mode" role="img">
              🌜
            </span>
          )}
        </DarkThemeButton>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 8px;
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

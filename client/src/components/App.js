import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import HouseList from "../pages/HouseList";
import NewHouse from "../pages/NewHouse";
import EditHouse from "../pages/EditHouse";
import About from "../pages/About";
import DarkThemeButton from "../styles/DarkThemeButton.js";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../theme";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  // 	Use effect on load fetches info from backend and sets that user info into state
  useEffect(() => {
    // .ok Boolean stating whether the response was successful (status in the range 200-299) or not
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  // if bad info takes to log in screen
  if (!user) return <Login onLogin={setUser} />;

  return (
    <Wrapper>
      {/* dark button elements */}
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <>
          <GlobalStyles />
          <NavBar setUser={setUser} />
          <DarkButton>
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
            </DarkThemeButton>{" "}
          </DarkButton>
          <h3>hello, {user.username} </h3> {/* react router elements */}
          <main>
            <Switch>
              <Route exact path="/new">
                <NewHouse />
              </Route>
              <Route exact path="/">
                <HouseList />
              </Route>
              <Route exact path="/About">
                <About />
              </Route>
              <Route exact path="/Edit">
                <EditHouse />
              </Route>
            </Switch>
          </main>
        </>
      </ThemeProvider>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;
const DarkButton = styled.div``;

export default App;

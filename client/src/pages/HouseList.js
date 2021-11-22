import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function HouseList() {
  const [usersHouses, setUserHouses] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/houses")
      .then((r) => r.json())
      .then((data) => setUserHouses(data));
  }, []);

  function handleDelete(deleteHouse) {
    fetch("/houses/" + deleteHouse.target.id, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(setUserHouses);
  }

  const handleSearch = (e) => {
    // get to handle request
    fetch("/housesQuery/" + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setUserHouses(data));
  };

  // create input value and button x
  // search through descr
  //  state controlled inputx
  // include a onclick for button x
  // handler for the onclick, handleSearch x
  // inside handleSearch x
  // use GET to show the queried data x
  // use my response and set that data to state

  // route will go to houses controller
  // in side the houses controller will use new method that retrieves the queried data
  // returns to front end

  return (
    <Wrapper>
      <label>search here</label>
      <input
        type="text"
        id="searchBar"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>SEARCH</button>
      {usersHouses && usersHouses.length > 0 ? (
        usersHouses.map((house) => (
          <House key={house.id}>
            <Box>
              <h2>{house.address}</h2>
              <ReactMarkdown>{house.description}</ReactMarkdown>
              <Button>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={{
                    pathname: "/Edit",
                    state: { house: house },
                  }}
                >
                  Edit
                </Link>
              </Button>{" "}
              <Button id={house.id} onClick={handleDelete}>
                Remove
              </Button>
            </Box>
          </House>
        ))
      ) : (
        <>
          <h2>No Houses Found</h2>
          <Button as={Link} to="/new">
            Add a new House
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const House = styled.article`
  margin-bottom: 24px;
`;

export default HouseList;

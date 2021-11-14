import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function HouseList() {
  const [usersHouses, setUserHouses] = useState(null);
  // on page load sets state from fetch to UsersHouses
  useEffect(() => {
    fetch("/showhouses")
      .then((r) => r.json())
      .then((data) => setUserHouses(data));
  }, []);

  function handleDelete(deleteHouse) {
    fetch("/showhouses/houses/" + deleteHouse.target.id, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(setUserHouses);
  }

  return (
    <Wrapper>
      {/* makes sure that usersHouses is valid, because can possibly render before useEffect has ran */}
      {usersHouses && usersHouses.houses.length > 0 ? (
        usersHouses.houses.map((house) => (
          <House key={house.id}>
            <Box>
              <h2>{house.address}</h2>
              <ReactMarkdown>{house.description}</ReactMarkdown>
              <Button>
                {/* in this Link element state is being defined that will be passed to EditHouse.js */}
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

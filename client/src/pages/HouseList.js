import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function HouseList() {
  const [houses, setHouses] = useState([]);
  function handleDelete(deleteHouse) {
    fetch("/houses/" + deleteHouse.target.id, {
      method: "DELETE",
    });
    const updatedList = houses.filter(
      (house) => house.id !== deleteHouse.target.id
    );
    setHouses(updatedList);
    // setHouses(houses.filter((house) => house !== deleteHouse));
  }

  useEffect(() => {
    fetch("/houses")
      .then((r) => r.json())
      .then(setHouses);
  }, []);

  return (
    <Wrapper>
      {houses.length > 0 ? (
        houses.map((house) => (
          <House key={house.id}>
            <Box>
              <h2>{house.address}</h2>
              <ReactMarkdown>{house.description}</ReactMarkdown>

              <button id={house.id} onClick={handleDelete}>
                Remove
              </button>
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

import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function EditHouse() {
  // UseLocation hook is required when passing state through Link component from HouseList.js
  const location = useLocation();
  const { house } = location.state;
  const [description, setDescription] = useState(house.description);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [address, setAdress] = useState(house.address);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/showhouses/" + house.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        description,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        // if response is ok, takes use back to houselist page
        history.push("/");
      } else {
        // if there was an input error, the error messages will be set into state
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Edit house</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="adress">Adress</Label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
              autoFocus
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Update house"}
            </Button>{" "}
            <Button color="primary" type="button" as={Link} to="/">
              Cancel
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default EditHouse;

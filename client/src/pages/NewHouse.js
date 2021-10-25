import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewHouse({ user }) {
  const [address, setAdress] = useState("enter address here");
  // const [minutesToComplete, setMinutesToComplete] = useState("30");
  const [description, setDescription] = useState(`My ideal house has.
  
## Bedrooms

- spacious and natural light
- carpet through out

## back yard

**Entertainers paradise** large and inviting
  `);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/houses", {
      method: "POST",
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
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add house</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="adress">Adress</Label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
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
              {isLoading ? "Loading..." : "Add house"}
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

export default NewHouse;

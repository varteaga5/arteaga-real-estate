import styled from "styled-components";
import { Box } from "../styles";

function About() {
  return (
    <Wrapper>
      <House>
        <Box>
          Hello, my name is Vincent and I am honored and excited to work with
          you in finding your dream home.{" "}
        </Box>
      </House>
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

export default About;

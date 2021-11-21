import styled from "styled-components";
import { Box } from "../styles";
import LogoSrc from "../styles/assets/vince profile pic - Cropped 10mb - Copy.png";

function About() {
  return (
    <Wrapper>
      <House>
        <Box>
          Hello, my name is Vincent and I am honored and excited to work with
          you in finding your dream home.
        </Box>
        <Logo src={LogoSrc} />
      </House>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  //   max-width: 800px;
  //   margin: 40px auto;

  max-width: 800px;
  margin: 40px auto;
  padding: 16px;
`;

const House = styled.article`
  margin-bottom: 24px;
`;

const Logo = styled.img`
  bottom: 40%;
  left: 45%;
`;

export default About;

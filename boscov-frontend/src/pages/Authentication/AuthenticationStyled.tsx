import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;


interface SectionProps {
    type: "signin" | "signup";
  }

export const Section = styled.section<SectionProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 400px;
  padding: 2rem;
  gap: 1rem;
  background-color: ${(props) => (props.type === "signin" ? "#005954" : "white")};
  color: ${(props) => (props.type === "signup" ? "#005954" : "white")};

  h2 {
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
  }
`;

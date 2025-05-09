import styled from "styled-components";

export const AvaliacaoContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.8rem;
  }

  .rating-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;

    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: #555;
    }

    .rating-value {
      margin-top: 1rem;
      font-weight: 500;
      color: #333;
    }
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .success-message {
    padding: 0.75rem;
    margin-bottom: 1rem;
    background-color: #e6f7e6;
    color: #005954;
    border-radius: 4px;
    border-left: 4px solid #005954;
  }
`;

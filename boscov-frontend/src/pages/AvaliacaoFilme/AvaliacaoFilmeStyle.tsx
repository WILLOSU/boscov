import styled from "styled-components";

export const AvaliacaoContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #444;
    }
  }

  .rating-selector {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: #f7f7f7;
  }

  .rating-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #e9e9e9;
    }

    input[type="radio"] {
      margin-bottom: 0.3rem;
    }

    label {
      font-size: 1rem;
      margin: 0;
      cursor: pointer;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;
  }

  .success-message {
    padding: 0.75rem;
    background-color: #d4edda;
    color: #155724;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    
    .rating-selector {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .rating-option {
      flex: 0 0 18%;
    }
    
    .button-group {
      flex-direction: column;
      gap: 0.75rem;
    }
  }
`;
import styled from "styled-components"

export const AddComentContainer = styled.div`
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

  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }
    
    textarea {
      width: 100%;
      min-height: 120px;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
      font-family: inherit;
      
      &:focus {
        outline: none;
        border-color: #666;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
      }
      
      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
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
`

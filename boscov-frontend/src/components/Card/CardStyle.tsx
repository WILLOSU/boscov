import styled from "styled-components"

interface CardBodyProps {
  $top?: boolean
}

export const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
  padding: 2rem;
  background-color: #fff;
  box-shadow: rgba(50, 50, 105, 0.149) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 0.3rem;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`

export const CardBody = styled.article<CardBodyProps>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between; /* mantive apenas esse */
  padding: 16px;
  padding-top: 40px;
  padding-right: 40px;
  gap: 1rem;
  position: relative;

  font-size: ${(props) => (props.$top ? "1.5rem" : ".9rem")};

  h2 {
    margin-bottom: 1rem;
    font-size: ${(props) => (props.$top ? "3rem" : "1.5rem")}; // usei template strings
  }

  img {
    width: ${(props) => (props.$top ? "164px" : "120px")};
    height: ${(props) => (props.$top ? "236px" : "180px")};
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.05);
  }
`

export const CardFooter = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .bi-star-fill {
    color: #f8c53f;
    font-size: 1.5rem;
    transition: transform 0.3s ease, filter 0.3s ease;

    &:hover {
      transform: scale(1.2);
      filter: brightness(1.2);
    }
  }

  .bi-chat-fill {
    color: #005954;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(-10deg) scale(1.2);
    }
  }
  
  /* Adicione este estilo para garantir que o Link não afete o layout */
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .detalhes {
    margin-top: 2.5rem;
    font-size: 14px;
    text-align: left;
  }
`

export const EditIcon = styled.i`
  font-size: 1.5rem;
  color: #005954;
  cursor: pointer;
`

export const CommentSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-top: 1px solid #eee;
`

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`

export const CommentItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`

export const AddCommentForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`

export const CommentInput = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  min-height: 50px;
`

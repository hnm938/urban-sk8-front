import styled from "styled-components";

const ProductsGrid = styled.div`
  width: 95%;

  padding: 1rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, max-content);
  align-items: flex-start;
  justify-content: center;
  gap: 1.5cqw 2.25cqw;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(4, max-content);
  }

  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(3, max-content);
  }

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(2, max-content);
  }
`;

export default function NewProducts({ products  }) {
  return (
    <div></div>
  )
}
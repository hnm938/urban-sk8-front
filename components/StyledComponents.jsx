import styled from "styled-components";

export const Hero = styled.div`
  width: 100%;
  height: ${props => props.$height || "20vw"};
  max-height: ${props => props.$maxHeight || ""};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url(${props => props.$backgroundImage});
  background-size: cover;

  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.25);
`;

export const Splitter = styled.hr`

`;

export const Button = styled.button`
  width: fit-content;
  max-height: 50px;
  padding: 1.25cqw 2cqw;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--coral-1);
  border-bottom: solid var(--coral-3) 4px;
  border-radius: 2px 2px 0 0;

  font-size: clamp(14px, 1cqw, 1cqw);
  font-weight: 600;
  letter-spacing: 2px;
  color: white;
  white-space: nowrap;

  transition: filter 150ms ease;

  &:hover {
    filter: brightness(0.9);
  }

  ${(props) =>
    props.outlined &&
    `
      background-color: transparent;
      outline: solid var(--coral-3) 2px;
    
      border: none;
      border-radius: 2px;
    
      color: var(--coral-1);
    
      position: relative;
    
      &::after {
        content: "";
        content: "";
  
        width: calc(100% - 5px);
        height: calc(100% - 5px);

        position: absolute;

        background: transparent;

        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
        
        border: solid var(--coral-1) 2px;
        border-radius: 2px;
        transition: all 150ms ease;
      }
    
      &:hover  {
        color: white;
        filter: brightness(1);
        &::after { background-color: var(--coral-1); z-index: -1; }
      }
    `}
`;

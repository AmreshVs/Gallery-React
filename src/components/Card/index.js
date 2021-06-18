import styled from "styled-components";

const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px solid #000;
  background: #FFF;
  max-width: 900px;

  ${props => props.size === 'small' && `
   & {
    max-width: 440px;
  }
  `}
`;

export default Card;
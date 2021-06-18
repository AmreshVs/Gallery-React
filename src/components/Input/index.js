import styled from "styled-components";

import theme from "../../theme";

const Input = styled.input`
  padding: 15px 10px;
  border-radius: 5px;
  border: 2px solid #ddd;
  width: 100%;
  margin: 10px 0;
  outline: none;
  transition: all .3s;
  font-size: 1.7rem;

  &:focus, :focus-visible, :hover{
    border-color: ${theme.primary};
  }
`;

export default Input;
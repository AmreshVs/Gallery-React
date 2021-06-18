import styled from "styled-components";
import Loader from "components/Loader";
import theme from "../../theme";

const ButtonStyle = styled.button.attrs(props => ({
  color: props.primary ? theme.primary : theme.secondary,
  hoverColor: props.primary ? theme.primaryHover : theme.secondaryHover,
}))`
  background: ${props => props.color};
  border-radius: 5px;
  border: none;
  color: #FFF;
  cursor: pointer;
  font-weight: bold;
  margin: 10px 0;
  padding: 15px 10px;
  text-transform: uppercase;
  transition: all .2s;
  width: 100%;

  &:hover{
    background: ${props => props.hoverColor};
  }

  ${props => props.disabled && `
    filter: contrast(0.5);
    cursor: not-allowed;

    & input{
      cursor: not-allowed;
      pointer-events: none;
    }
  `}
`;

const Button = ({ children, loading, ...rest }) => {
  return (
    <ButtonStyle {...rest}>
      {loading ? <Loader size="small" loading={loading} /> : children}
    </ButtonStyle>
  )
}

export default Button;
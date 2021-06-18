import styled from 'styled-components';

import theme from 'theme';

const LoaderStyle = styled.div`
  display: inline-flex;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid ${theme.primary}; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  ${props => props.size === 'small' && `
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid ${theme.primary};
    display: inline-flex;
  `}

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader = ({ children, loading, size }) => {

  if (loading) {
    return (
      <LoaderStyle size={size} />
    )
  }

  return children ? children : null;
}

export default Loader;
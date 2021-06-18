import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { validateUser } from 'pages/utils';
import { snackBarError } from 'components/Snackbar';

import Logo from 'images/logo.png';
import Icon from 'icon';

const TopNavStyles = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFF;
  padding: 0 20px;
`;

const TopNav = () => {

  const history = useHistory();

  const handleLogout = () => {
    try {
      let userData = localStorage.removeItem('userData');

      if (!userData) {
        axios.defaults.headers.common.Authorization = '';
        history.replace('/login');
      }
    }
    catch (error) {
      snackBarError('Error Occured');
    }
  }

  return (
    <TopNavStyles className="topNav">
      <div className="topNav__brand">
        <img className="topNav__logo" src={Logo} alt="logo" />
        Cloud Gallery
      </div>
      <div>
        {validateUser() &&
          <ul>
            <li className="topNav__list" onClick={() => handleLogout()}>
              <Icon name="signout" on="button" />
              Logout
            </li>
          </ul>
        }
      </div>
    </TopNavStyles>
  )
}

export default TopNav;
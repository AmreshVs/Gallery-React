import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Loader from 'components/Loader';

const Main = (props) => {

  const history = useHistory();

  useEffect(() => {
    const validateUser = async () => {
      let userData = await localStorage.getItem('userData');
      userData = JSON.parse(userData);
      if (userData === null || Object.keys(userData) <= 0) {
        history.replace('/login');
      }
      else {
        axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
        history.push('/gallery');
      }
    }

    validateUser();
  }, [history, props])

  return (
    <Loader />
  )
}

export default Main;
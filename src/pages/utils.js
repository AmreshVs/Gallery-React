import axios from "axios";

export const validateUser = () => {
  let userDataJSON = localStorage.getItem('userData');
  userDataJSON = JSON.parse(userDataJSON);

  if (userDataJSON === null) {
    axios.defaults.headers.common.Authorization = '';
    return false;
  }
  else {
    axios.defaults.headers.common.Authorization = `Bearer ${userDataJSON.token}`;
    return true;
  }
}
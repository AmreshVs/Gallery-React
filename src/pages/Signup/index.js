import axios from 'axios';
import UseAxios from 'hooks/UseAxios';
import { SIGNUP } from 'api';
import { snackBarError } from 'components/Snackbar';
import { Formik } from 'formik';
import { useHistory, Link } from 'react-router-dom';

import Card from "components/Card";
import Logo from 'images/logo.png';
import Input from 'components/Input';
import Button from 'components/Button';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be greater than 6 characters';
  }

  if (!values.repassword) {
    errors.repassword = 'Password required';
  } else if (values.password != values.repassword) {
    errors.repassword = 'Passwords does not match!';
  }

  return errors;
}

const Signup = () => {
  const history = useHistory();

  const handleSignup = async (values) => {
    var formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);

    const response = await UseAxios(SIGNUP, formData);

    if (!response.error) {
      axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
      localStorage.setItem('userData', JSON.stringify(response));
      history.push('/gallery');
    } else {
      snackBarError(response.message);
    }
  }

  return (
    <Card className="signup">
      <img className="App-logo" src={Logo} alt="logo" />
      <h1 className="login__title">Signup to access cloud gallery storage</h1>
      <Formik
        initialValues={{ username: '', email: '', password: '', repassword: '' }}
        validate={values => validate(values)}
        onSubmit={(values, { setSubmitting }) => {
          handleSignup(values)
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && <p className="error">{errors.username}</p>}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && <p className="error">{errors.password}</p>}
            <Input
              type="password"
              name="repassword"
              placeholder="Re-Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repassword}
            />
            {errors.repassword && touched.repassword && <p className="error">{errors.repassword}</p>}
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting} primary>Signup</Button>
          </form>
        )}
      </Formik>
      <p>Already own an account? <Link to="/login">Login</Link></p>
    </Card>
  )
}

export default Signup;
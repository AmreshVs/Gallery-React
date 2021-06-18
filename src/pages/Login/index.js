import axios from 'axios';
import UseAxios from 'hooks/UseAxios';
import { LOGIN } from 'api';
import { snackBarError } from 'components/Snackbar';
import { Formik } from 'formik';
import { useHistory, Link } from 'react-router-dom';

import Card from "components/Card";
import Logo from 'images/logo.png';
import Input from 'components/Input';
import Button from 'components/Button';
import { validate } from './validate';

const Login = () => {
  const history = useHistory();

  const handleLogin = async (values) => {
    var formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    const response = await UseAxios(LOGIN, formData);

    if (!response.error) {
      axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
      localStorage.setItem('userData', JSON.stringify(response));
      history.push('/gallery');
    } else {
      snackBarError(response.message);
    }
  }

  const Form = () => (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => validate(values)}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values);
        setSubmitting(false);
      }}
    >
      {({
        values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email} />
          {errors.email && touched.email && <p className="error">{errors.email}</p>}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            required />
          {errors.password && touched.password && <p className="error">{errors.password}</p>}
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting} primary>Login</Button>
        </form>
      )}
    </Formik>
  );

  return (
    <Card className="login" size="small">
      <img className="App-logo" src={Logo} alt="logo" />
      <h1 className="login__title">Login to your cloud gallery storage</h1>
      <Form />
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </Card>
  )
}

export default Login;
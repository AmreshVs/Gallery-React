export const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
};

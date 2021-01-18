import React, { useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Message from '../shared/Message/Message';
import Loader from '../shared/Loader/Loader';
import { login, resetUserErrors } from '../../redux/actions/userActions';
import FormContainer from '../FormContainer/FormContainer';

const Login = () => {
  const { userInfo, loading, error: loginError } = useSelector((state) => state.userInfo);

  const { search } = useLocation();
  const history = useHistory();
  const redirect = queryString.parse(search).redirect || '/';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUserErrors);
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(userInfo || {}).length > 0) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const loginUser = useCallback(async (userData) => {
    const { email, password } = userData;
    await dispatch(login(email, password));
  }, [dispatch]);

  const validationSchema = useMemo(() => yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  }), []);

  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: (formValues) => {
      loginUser({ ...formValues });
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <FormContainer>
      <h2>Sign In</h2>
      <div>
        {loginError && <Message variant="danger">{loginError}</Message>}
      </div>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange}
            name="email"
            required
            isInvalid={!!errors?.email}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            name="password"
            required
            isInvalid={!!errors?.password}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">Sign In</Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          {' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;

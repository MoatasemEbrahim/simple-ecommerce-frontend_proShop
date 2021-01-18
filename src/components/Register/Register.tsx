import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
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
import { register, resetUserErrors } from '../../redux/actions/userActions';
import FormContainer from '../FormContainer/FormContainer';

const Register = () => {
  const [message, setMessage] = useState('');
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

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

  const registerUser = useCallback(async (userData) => {
    if (userData.password !== userData.confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      setMessage('');
      await dispatch(register({ ...userData }));
    }
  }, [dispatch]);

  const validationSchema = useMemo(() => yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().min(6),
  }), []);

  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: (formValues) => {
      registerUser({ ...formValues });
    },
  });

  if (loading) {
    return <Loader />;
  }

  const {
    name, email, password, confirmPassword,
  } = values;

  return (
    <FormContainer>
      <h2>Register</h2>
      <div>
        {(message || error) && <Message variant="danger">{message || error}</Message>}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange}
            name="name"
            required
            isInvalid={!!errors?.name}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
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
            value={password}
            onChange={handleChange}
            name="password"
            required
            isInvalid={!!errors?.password}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            required
            isInvalid={!!errors?.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.confirmPassword}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">Register</Button>
      </Form>

      <Row className="py-3">
        <Col>
          You have an account?
          {' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;

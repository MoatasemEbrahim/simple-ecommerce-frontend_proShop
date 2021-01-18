import React, {
  useEffect, useCallback, useMemo, useState,
} from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Message from '../shared/Message/Message';
import Loader from '../shared/Loader/Loader';
import { updateProfile, resetUserErrors } from '../../redux/actions/userActions';
import ChangePassword from './ChangePassword/ChangePassword';

const Profile = () => {
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

  const history = useHistory();
  const dispatch = useDispatch();
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    dispatch(resetUserErrors);
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(userInfo || {}).length === 0) {
      history.push('/');
    }
  }, [history, userInfo]);

  const handleCloseChangePassword = useCallback(() => setShowChangePassword(false), []);

  const handleUpdateProfile = useCallback(async ({ name, email }) => {
    await dispatch(updateProfile({ name, email }));
  }, [dispatch]);

  const validationSchema = useMemo(() => yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
  }), []);

  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: userInfo?.name || '',
      email: userInfo?.email || '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: (formValues) => {
      handleUpdateProfile({ ...formValues });
    },
  });

  if (loading && !showChangePassword) {
    return <Loader />;
  }

  const { name, email } = values;

  return (
    <>
      <Row>
        <Col md={3}>
          <h3>My Profile</h3>
          <div>
            {error && !showChangePassword && <Message variant="danger">{error}</Message>}
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
                isInvalid={!!errors?.email}
              />
              <Form.Control.Feedback type="invalid">{errors && errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary">Update</Button>
          </Form>
          <Row className="py-3">
            <Col>
              <Button className="p-0" variant="link" onClick={() => { setShowChangePassword(true); }}>Change password</Button>
            </Col>
          </Row>
        </Col>
        <Col md={9}>
          <h3>My Orders</h3>
        </Col>
      </Row>
      {showChangePassword
       && <ChangePassword isOpen={showChangePassword} handleClose={handleCloseChangePassword} />}
    </>
  );
};

export default Profile;

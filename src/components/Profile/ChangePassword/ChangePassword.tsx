import React, {
  FC, useCallback, useMemo, useState, useEffect,
} from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetUserErrors } from '../../../redux/actions/userActions';
import Message from '../../shared/Message/Message';
import Loader from '../../shared/Loader/Loader';

const ChangePassword:FC<Props> = ({ isOpen, handleClose }:Props) => {
  const { loading, error } = useSelector((state) => state.userInfo);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUserErrors);
  }, [dispatch]);

  const handleUpdatePassword = useCallback(async (userData) => {
    if (userData.password !== userData.confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      setMessage('');
      const isUpdatedSuccessfully = await dispatch(updateProfile({ ...userData }));
      if (isUpdatedSuccessfully) {
        handleClose();
      }
    }
  }, [dispatch, handleClose]);

  const validationSchema = useMemo(() => yup.object().shape({
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().min(6),
  }), []);

  const {
    values, errors, handleChange, handleSubmit, submitForm,
  } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: (formValues) => {
      handleUpdatePassword({ ...formValues });
    },
  });
  const { password, confirmPassword } = values;

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? <Loader /> : (
          <>
            <div>
              {(message || error) && <Message variant="danger">{message || error}</Message>}
            </div>
            <Form onSubmit={handleSubmit}>
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
            </Form>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitForm}>
          Update password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;

interface Props {
  isOpen: boolean,
  handleClose: ()=>void
}

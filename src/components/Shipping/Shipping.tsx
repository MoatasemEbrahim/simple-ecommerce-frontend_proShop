import React, {
  useCallback, useMemo, useEffect,
} from 'react';
import {
  Form, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { updateShippingAddress } from '../../redux/actions/cartActions';
import FormContainer from '../shared/FormContainer/FormContainer';
import CheckoutSteps from '../shared/CheckoutSteps/CheckoutSteps';

const Shipping = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const { shippingAddress } = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(userInfo || {}).length === 0) {
      history.push('/');
    }
  }, [history, userInfo]);

  const confirmShippingData = useCallback(async (userData) => {
    await dispatch(updateShippingAddress({ ...userData }));
    history.push('/payment');
  }, [dispatch, history]);

  const validationSchema = useMemo(() => yup.object().shape({
    address: yup.string().required(),
    postalCode: yup.number().typeError('Postal code must be number').required(),
    city: yup.string().required(),
    country: yup.string().required(),
  }), []);

  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      address: shippingAddress.address || '',
      postalCode: shippingAddress.postalCode || '',
      city: shippingAddress.city || '',
      country: shippingAddress.country || '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: (formValues) => {
      confirmShippingData({ ...formValues });
    },
  });

  const {
    address, postalCode, city, country,
  } = values;
  return (
    <FormContainer>
      <CheckoutSteps step={1} />
      <h2>Shipping</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your address"
            value={address}
            onChange={handleChange}
            name="address"
            required
            isInvalid={!!errors?.address}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.address}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={handleChange}
            name="postalCode"
            required
            isInvalid={!!errors?.postalCode}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.postalCode}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your city"
            value={city}
            onChange={handleChange}
            name="city"
            required
            isInvalid={!!errors?.city}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.city}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your country"
            value={country}
            onChange={handleChange}
            name="country"
            required
            isInvalid={!!errors?.country}
          />
          <Form.Control.Feedback type="invalid">{errors && errors.country}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;

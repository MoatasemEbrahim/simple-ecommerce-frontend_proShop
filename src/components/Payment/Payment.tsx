import React, {
  useCallback, useMemo, useEffect,
} from 'react';
import {
  Form, Button, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { updatePaymentMethod } from '../../redux/actions/cartActions';
import FormContainer from '../shared/FormContainer/FormContainer';
import CheckoutSteps from '../shared/OrderDetails/CheckoutSteps/CheckoutSteps';

const Payment = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const {
    shippingAddress,
    paymentMethod: defaultPaymentMethod,
  } = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
      history.push('/shipping');
    }
  }, [shippingAddress, history]);
  useEffect(() => {
    if (Object.keys(userInfo || {}).length === 0) {
      history.push('/');
    }
  }, [history, userInfo]);

  const confirmPaymentMethod = useCallback(async ({ paymentMethod }) => {
    await dispatch(updatePaymentMethod(paymentMethod));
    history.push('/order');
  }, [dispatch, history]);

  const validationSchema = useMemo(() => yup.object().shape({
    paymentMethod: yup.string().required(),
  }), []);

  const {
    values, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      paymentMethod: defaultPaymentMethod || 'PayPal',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: (formValues) => {
      confirmPaymentMethod({ ...formValues });
    },
  });

  const { paymentMethod } = values;
  return (
    <FormContainer>
      <CheckoutSteps step={2} />
      <h2>Payment Method</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Payment method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={handleChange}
              checked={paymentMethod === 'PayPal'}
            />
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;

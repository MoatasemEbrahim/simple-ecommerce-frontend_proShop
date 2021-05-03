import React, { useMemo } from 'react';
import {
  Button, Row, Col, ListGroup, Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CheckoutSteps from '../shared/OrderDetails/CheckoutSteps/CheckoutSteps';
import ordersAPI from '../../api/orders';
import { resetCartItems } from '../../redux/actions/cartActions';
import OrderItems from '../shared/OrderDetails/OrderItems/OrderItems';
import OrderSummary from '../shared/OrderDetails/OrderSummary/OrderSummary';

const PlaceOrder = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  if (!shippingAddress?.address) {
    history.push('/shipping');
  } else if (!paymentMethod) {
    history.push('/payment');
  }

  const itemsPrice = useMemo(() => cartItems?.reduce(
    (acc, item) => acc + item.price * item.qty, 0,
  ) || 0, [cartItems]);

  const shippingPrice = useMemo(() => (itemsPrice > 100 ? 0 : 30), [itemsPrice]);
  const taxPrice = useMemo(() => 0.14 * itemsPrice, [itemsPrice]);
  const totalPrice = useMemo(() => (itemsPrice + shippingPrice + taxPrice),
    [itemsPrice, shippingPrice, taxPrice]);

  const placeOrderHandler = async () => {
    const orderData = {
      items: cartItems.map((item) => {
        const {
          name, image, price, qty, productId,
        } = item;

        return {
          name, image, price, quantity: qty, product: productId,
        };
      }),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
      shippingAddress,
    };
    try {
      const order = await ordersAPI.createOrder(orderData);
      dispatch(resetCartItems);
      history.push(`/order/${order?._id}`);
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <>
      <CheckoutSteps step={3} />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong>
                {`${shippingAddress?.address || ''},
                 ${shippingAddress?.city || ''},
                 ${shippingAddress?.postalCode || ''},
                 ${shippingAddress?.country || ''}
                `}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <OrderItems items={cartItems} />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <OrderSummary
                itemsPrice={itemsPrice}
                shippingPrice={shippingPrice}
                taxPrice={taxPrice}
                totalPrice={totalPrice}
              />
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;

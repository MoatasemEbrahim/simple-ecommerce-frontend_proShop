import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Row, Col, ListGroup, Image, Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Message from '../shared/Message/Message';
import CheckoutSteps from '../shared/CheckoutSteps/CheckoutSteps';
import ordersAPI from '../../api/orders';
import { resetCartItems } from '../../redux/actions/cartActions';

const PlaceOrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  if (!shippingAddress?.address) {
    history.push('/shipping');
  } else if (!paymentMethod) {
    history.push('/payment');
  }

  const addDecimals = useCallback((num) => (Math.round(num * 100) / 100).toFixed(2), []);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0,
  ) || 0;

  const shippingPrice = itemsPrice > 100 ? 0 : 30;
  const taxPrice = 0.14 * itemsPrice;
  const totalPrice = addDecimals(itemsPrice + shippingPrice + taxPrice);

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
                <strong>Address:</strong>
                {shippingAddress?.address || ''}
                ,
                {' '}
                {shippingAddress?.city || ''}
                {' '}
                {shippingAddress?.postalCode || ''}
                ,
                {' '}
                {shippingAddress?.country || ''}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.productId}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}
                          {' '}
                          x $
                          {addDecimals(item.price)}
                          {' '}
                          = $
                          {addDecimals(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    $
                    {addDecimals(itemsPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    $
                    {addDecimals(shippingPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    $
                    {addDecimals(taxPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    $
                    {totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* {error && <Message variant="danger">{error}</Message>} */}
              </ListGroup.Item>
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

export default PlaceOrderScreen;

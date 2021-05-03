import React, { useCallback } from 'react';
import {
  Row, Col, ListGroup,
} from 'react-bootstrap';

const OrderSummary = ({
  itemsPrice, shippingPrice, taxPrice, totalPrice,
}:Prices) => {
  const addDecimals = useCallback((num) => (Math.round(num * 100) / 100).toFixed(2), []);

  return (
    <>
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
            {addDecimals(totalPrice)}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default OrderSummary;

export interface Prices {
  itemsPrice: number,
  shippingPrice: number,
  taxPrice: number,
  totalPrice: number,
}

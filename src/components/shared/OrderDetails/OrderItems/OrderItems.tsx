import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row, Col, ListGroup, Image,
} from 'react-bootstrap';
import Message from '../../Message/Message';

const OrderItems = ({ items }:{items:OrderItem[]}) => (
  <>
    <h3>Order Items</h3>
    {items.length === 0 ? (
      <Message>Your cart is empty</Message>
    ) : (
      <ListGroup variant="flush">
        {items.map((item) => (
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
                {item.price}
                {' '}
                = $
                {item.qty * item.price}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
  </>
);

export default OrderItems;

interface OrderItem {
  id: string,
  name: string,
  image: string,
  qty: number,
  productId: string,
  price: number
}

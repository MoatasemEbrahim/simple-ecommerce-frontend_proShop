import React, { FC, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  Row, Col, ListGroup, Image, Form, Button,
} from 'react-bootstrap';
import Message from '../../shared/Message/Message';
import { CartItem } from '../../../types/cart';

const ItemsList:FC<Props> = ({ cartItems, handleQtyChange, handleRemoveFromCart }:Props) => {
  if (cartItems.length === 0) {
    return (
      <Message>
        Your cart is empty
        {' '}
        <Link to="/">Go Back</Link>
      </Message>
    );
  }
  return (

    <ListGroup variant="flush">
      {cartItems.map((item) => (
        <ListGroup.Item key={item.productId}>
          <Row>
            <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/product/${item.productId}`}>{item.name}</Link>
            </Col>
            <Col md={2}>
              {`$${item.price}`}
            </Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={item.qty}
                onChange={handleQtyChange(item.productId)}
                size="sm"
              >
                {[...Array(item.countInStock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button type="button" variant="light" onClick={handleRemoveFromCart(item.productId)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ItemsList;

interface Props {
  cartItems: CartItem[],
  handleQtyChange: (string)=>(event: ChangeEvent<HTMLInputElement>)=>void,
  handleRemoveFromCart: (id)=>()=>void,
}

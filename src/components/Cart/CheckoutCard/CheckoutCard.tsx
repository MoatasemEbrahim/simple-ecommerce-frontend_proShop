import React, { FC } from 'react';
import {
  ListGroup, Button, Card,
} from 'react-bootstrap';
import { CartItem } from '../../../types/cart';

const CheckoutCard:FC<Props> = ({ cartItems, handleCheckout }:Props) => {
  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  return (
    <ListGroup variant="flush">
      <Card>
        <ListGroup.Item>
          <h4>
            Subtotal (
            {itemsCount}
            ) items
          </h4>
          <br />
          <h5>
            Price: $
            {totalPrice}
          </h5>
          <br />
        </ListGroup.Item>
        <ListGroup.Item>
          <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={handleCheckout}>
            Proceed To Checkout
          </Button>
        </ListGroup.Item>
      </Card>
    </ListGroup>
  );
};

export default CheckoutCard;

interface Props {
  cartItems: CartItem[],
  handleCheckout: ()=>void
}

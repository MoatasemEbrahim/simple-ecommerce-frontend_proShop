import React, { useCallback, useEffect } from 'react';
import {
  useDispatch, useSelector,
} from 'react-redux';
import {
  Row, Col,
} from 'react-bootstrap';
import { useParams, useLocation, useHistory } from 'react-router';
import queryString from 'query-string';

import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import ItemsList from './ItemsList/ItemsList';
import CheckoutCard from './CheckoutCard/CheckoutCard';

const Cart = () => {
  const { id: productId } = useParams();
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const { qty } = queryString.parse(search);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, Number(qty)));
    }
  }, [dispatch, productId, qty]);

  const handleQtyChange = useCallback((id) => ({ target: { value } }) => {
    dispatch(addToCart(id, parseInt(value, 10)));
  }, [dispatch]);

  const handleRemoveFromCart = useCallback((id) => () => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    history.push('/shipping');
  }, [history]);

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping cart</h2>
        <ItemsList
          cartItems={cartItems}
          handleQtyChange={handleQtyChange}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </Col>
      <Col md={4}>
        <CheckoutCard
          cartItems={cartItems}
          handleCheckout={handleCheckout}
        />
      </Col>
    </Row>
  );
};

export default Cart;

import React, { useCallback, useEffect, useState } from 'react';
import {
  Row, Col, ListGroup, Card,
} from 'react-bootstrap';
import { useParams } from 'react-router';
import { PayPalButton } from 'react-paypal-button-v2';
import OrdersAPI from '../../api/orders';
import configAPI from '../../api/config';
import OrderItems from '../shared/OrderDetails/OrderItems/OrderItems';
import OrderSummary from '../shared/OrderDetails/OrderSummary/OrderSummary';
import Loader from '../shared/Loader/Loader';
import Message from '../shared/Message/Message';

const CheckoutOrder = () => {
  const [orderDetails, setOrderDetails] = useState <IOrderDetails | null>(null);
  const [loading, setLoading] = useState <boolean>(false);
  const [sdkReady, setSdkReady] = useState <boolean>(false);
  const { id } = useParams();

  const enablePaypalSDK = useCallback(async () => {
    const PaypalClientId = await configAPI.getPaypalConfig();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${PaypalClientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  }, []);

  const formatOrder = useCallback((order) => order && ({
    ...order,
    items: order.items.map(
      (item) => ({ ...item, qty: item.quantity, productId: item.product }),
    ),
  }), []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const order = formatOrder(await OrdersAPI.getOrderById(id));
        setOrderDetails(order);
        if (order && !order.isPaid) { enablePaypalSDK(); }
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, formatOrder, enablePaypalSDK]);

  const paymentResultHandler = async (paymentResult) => {
    try {
      const paymentInfo = {
        id: paymentResult.id,
        status: paymentResult.status,
        updateTime: new Date(paymentResult.update_time),
        email: paymentResult.payer.email,
      };
      setLoading(true);
      const order = formatOrder(await OrdersAPI.payOrder(id, paymentInfo));
      setOrderDetails(order);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.warn(error.message);
    }
  };

  const {
    shippingAddress, paymentMethod = '', items = [], itemsPrice = 0, shippingPrice = 0, taxPrice = 0, totalPrice = 0,
    user, isPaid, paidAt, isDelivered, deliveredAt,
  } = orderDetails || {};

  if (loading) return <Loader />;

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>Shipping</h3>
            <p>
              Name:
              {' '}
              <strong>{user?.name || ''}</strong>
            </p>
            <p>
              Email:
              {' '}
              <a href={`mailto:${user?.email || ''}`}>{user?.email || ''}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {`${shippingAddress?.address || ''},
                 ${shippingAddress?.city || ''},
                 ${shippingAddress?.postalCode || ''},
                 ${shippingAddress?.country || ''}
                `}
            </p>
            <p>
              {isDelivered
                ? (
                  <Message variant="success">
                    Delivered on
                    {' '}
                    {deliveredAt || ''}
                  </Message>
                )
                : <Message variant="danger">Not delivered yet</Message>}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Payment Method</h3>
            <p>
              <strong>Method: </strong>
              {paymentMethod}
            </p>
            <p>
              {isPaid
                ? (
                  <Message variant="success">
                    Paid on
                    {' '}
                    {paidAt || ''}
                  </Message>
                )
                : <Message variant="danger">Not paid yet</Message>}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <OrderItems items={items} />
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
              {!sdkReady && <Loader />}
              {orderDetails && !orderDetails.isPaid && (
              <PayPalButton
                amount={orderDetails.totalPrice.toFixed(2)}
                onSuccess={paymentResultHandler}
              />
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckoutOrder;

export interface IOrderDetails {
  shippingAddress: Record<string, string|number>,
  paymentMethod:string
  itemsPrice: number,
  shippingPrice: number,
  taxPrice: number,
  totalPrice: number,
  items: IOrderItem[],
  user?: {
    name: string,
    email: string
  },
  isPaid: boolean,
  paidAt?: Date,
  isDelivered:boolean,
  deliveredAt?:Date
}

interface IOrderItem {
  id: string,
  name: string,
  image: string,
  qty: number,
  productId: string,
  price: number
}

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import OrderAPI from '../../../api/orders';
import Loader from '../../shared/Loader/Loader';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const userOrders = await OrderAPI.getLoggedInUserOrders();
        setOrders(userOrders);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.warn(error.message);
      }
    })();
  }, []);

  if (loading) { return <Loader />; }

  return (
    <>
      <h2>My Orders</h2>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice.toFixed(2)}</td>
              <td className="text-center">
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </td>
              <td className="text-center">
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </td>
              <td>
                <Link to={`/order/${order._id}`}>
                  <Button className="btn-sm" variant="light">
                    Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Orders;

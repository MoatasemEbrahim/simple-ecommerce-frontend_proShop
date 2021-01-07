import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Row, Col, Image, ListGroup, Card, Button, Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../shared/Rating/Rating';
// import { Product as ProductType } from '../../types/product';
import { listProductDetails } from '../../redux/actions/productActions';
import Loader from '../shared/Loader/Loader';
import Message from '../shared/Message/Message';

const Product = () => {
  // const [productData, setProductData] = useState<null|ProductType>(null);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { product = {}, loading, error } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
    // (async ():Promise<void> => {
    //   try {
    //     const product = await productsAPI.getProductById(id);
    //     setProductData(product);
    //   } catch (error) {
    //     console.warn(error.message);
    //   }
    // })();
  }, [id, dispatch]);

  const handleAddToCard = useCallback(() => {
    history.push(`/cart/${id}?qty=${qty}`);
  }, [history, id, qty]);

  if (loading) {
    return <Loader />;
  }

  const {
    name, imageURL, rating, numReviews, price, description, countInStock,
  } = product;
  return (
    <>
      <Link to="/">
        Go to home
      </Link>
      {error ? <Message variant="danger">{error}</Message> : (
        <Row>
          <Col sm={12} md={12} lg={6} className="mb-3">
            <Image src={imageURL} alt={name} fluid />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={rating} reviews={numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                Price: $
                {price}
              </ListGroup.Item>
              <ListGroup.Item>
                {description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={12} md={5} lg={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>{price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col>
                      {countInStock ? 'In stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {countInStock > 0
                && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={({ target: { value } }) => { setQty(parseInt(value, 10)); }}
                        size="sm"
                      >
                        {[...Array(countInStock).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button disabled={countInStock === 0} onClick={handleAddToCard} className="btn-block" type="button">
                        ADD TO CART
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Product;

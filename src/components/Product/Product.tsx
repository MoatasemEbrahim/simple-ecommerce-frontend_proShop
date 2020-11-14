import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Row, Col, Image, ListGroup, Card, Button,
} from 'react-bootstrap';
import Rating from '../shared/Rating/Rating';
import products from '../../products';

const Product = () => {
  const { id } = useParams();
  const {
    name, image, rating, numReviews, price, description, countInStock,
  } = products.find((singleProduct) => singleProduct.id === id);
  return (
    <>
      <Link to="/">
        Go to home
      </Link>
      <Row>
        <Col sm={12} md={12} lg={6} className="mb-3">
          <Image src={image} alt={name} fluid />
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
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button className="btn-block" type="button" disabled={countInStock === 0}>
                      ADD TO CART
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Row, Col, Image, ListGroup, Card, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../shared/Rating/Rating';
// import { Product as ProductType } from '../../types/product';
import { listProductDetails } from '../../redux/actions/productsActions';
import Loader from '../shared/Loader/Loader';
import Message from '../shared/Message/Message';

const Product = () => {
  // const [productData, setProductData] = useState<null|ProductType>(null);
  const { id } = useParams();
  const dispatch = useDispatch();

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
      )}
    </>
  );
};

export default Product;

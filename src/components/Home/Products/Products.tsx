import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../../shared/ProductCard/ProductCard';
import { Product } from '../../../types/product';
import Loader from '../../shared/Loader/Loader';
import Message from '../../shared/Message/Message';
import listProducts from '../../../redux/actions/productActions';

const Products = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products }:{
    loading: boolean,
    error?: string,
    products:Array<Product>
  } = productsList;

  useEffect(() => {
    (async () => {
      dispatch(listProducts);
    })();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <Row>
      {products.map((product) => (
        <Col sm={12} md={6} lg={3} key={product.id}>
          <ProductCard productData={product} />
        </Col>
      ))}

    </Row>
  );
};

export default Products;

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../../../products';
import ProductCard from '../../shared/ProductCard/ProductCard';

const Products = () => (
  <Row>
    {products.map((product) => (
      <Col sm={12} md={6} lg={3} key={product.id}>
        <ProductCard productData={product} />
      </Col>
    ))}

  </Row>
);

export default Products;

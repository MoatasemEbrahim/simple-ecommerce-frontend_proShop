import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../../shared/ProductCard/ProductCard';
import productsAPI from '../../../api/products';
import { Product } from '../../../types/product';

const Products = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  useEffect(() => {
    (async ():Promise<void> => {
      const newProducts = await productsAPI.getProducts();
      setProducts(newProducts);
    })();
  }, []);
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

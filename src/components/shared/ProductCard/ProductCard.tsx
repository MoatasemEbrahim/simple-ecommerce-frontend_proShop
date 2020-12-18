import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { Product } from '../../../types/product';

const ProductCard :FC<ProductProps> = ({ productData }:ProductProps) => {
  const {
    id, name, imageURL, price, rating, numReviews,
  } = productData;
  return (
    <Card className="my-3 rounded">
      <Link to={`/product/${id}`}>
        <Card.Img src={imageURL} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${id}`}>
          <Card.Title>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <div>
          <Rating rating={rating} reviews={numReviews} />
        </div>
        <Card.Text>
          {price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

interface ProductProps {
  productData: Product
}

export default ProductCard;

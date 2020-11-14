import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';

const ProductCard :FC<productProps> = ({ productData }:productProps) => {
  const {
    id, name, image, price, rating, numReviews,
  } = productData;
  return (
    <Card className="my-3 rounded">
      <Link to={`/product/${id}`}>
        <Card.Img src={image} variant="top" />
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

interface productProps {
    productData: {
        id: string,
        name: string,
        image: string,
        description: string,
        brand: string,
        price: number
        countInStock: number,
        rating: number,
        numReviews: number,
    }
}

export default ProductCard;

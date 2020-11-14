import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';

const ProductCard :FC<productProps> = ({ productData }:productProps) => {
  const {
    id, name, image, price, rating, numReviews,
    //  description, brand, category, countInStock,
  } = productData;
  return (
    <Card className="my-3 rounded">
      <Link to={`/products/${id}`}>
        <Card.Img src={image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${id}`}>
          <Card.Title>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>
          <Rating rating={rating} reviews={numReviews} />
        </Card.Text>
        <Card.Text>
          <h3>{price}</h3>
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

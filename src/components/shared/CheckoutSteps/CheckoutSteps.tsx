import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step }:{step:number}) => {
  const steps = [
    { title: 'Shipping', link: '/shipping' },
    { title: 'Payment', link: '/payment' },
    { title: 'Place Order', link: '/placeOrder' },
  ];
  return (
    <Nav className="justify-content-center mb-4">
      {steps.map((stepData, i) => (
        <Nav.Item key={stepData.title}>
          {step >= i + 1
            ? (
              <Nav.Link>
                <Link to={stepData.link}>
                  {stepData.title}
                  {' '}
                  {i + 1 === step && '*'}
                </Link>
              </Nav.Link>
            )
            : (
              <Nav.Link disabled>
                {stepData.title}
                {' '}
                {i + 1 === step && '*'}
              </Nav.Link>
            )}
        </Nav.Item>
      ))}

    </Nav>
  );
};

export default CheckoutSteps;

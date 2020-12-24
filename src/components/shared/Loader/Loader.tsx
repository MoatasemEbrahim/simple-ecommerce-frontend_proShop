import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <Spinner
    animation="border"
    role="status"
    style={{
      width: '3rem',
      height: '3rem',
      margin: '20% auto',
      padding: '1rem',
      display: 'block',
    }}
  >
    <span className="sr-only">Loading ...</span>
  </Spinner>
);

export default Loader;

import React, { FC, ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer:FC<Props> = ({ children }:Props) => (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={8}>
        {children}
      </Col>
    </Row>
  </Container>
);

interface Props {
  children:ReactNode
}

export default FormContainer;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <Row>
        <Col className="text-center py-2">
          Copyright &copy; Moatasem Ebrahim
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;

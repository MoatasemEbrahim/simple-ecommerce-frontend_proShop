import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Router from '../../utils/Router/Router';

const Layout = () => (
  <div className="vh-100 d-flex flex-column">
    <Header />
    <main className="my-3">
      <Container>
        <Router />
      </Container>
    </main>
    <Footer />
  </div>

);

export default Layout;

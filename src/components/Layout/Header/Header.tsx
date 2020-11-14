import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">ProShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/cart" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faShoppingCart} />
              <p className="mx-1 my-0">Cart</p>
            </Nav.Link>
            <Nav.Link href="/login" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} />
              <p className="mx-1 my-0">Sign in</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Link to="/">
          <Navbar.Brand>ProShop</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/cart" className="text-decoration-none mx-1">
              <Navbar.Text className="d-flex align-items-center">
                <FontAwesomeIcon icon={faShoppingCart} />
                <p className="mx-1 my-0">Cart</p>
              </Navbar.Text>
            </Link>
            <Link to="/login" className="text-decoration-none mx-1">
              <Navbar.Text className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} />
                <p className="mx-1 my-0">Sign in</p>
              </Navbar.Text>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;

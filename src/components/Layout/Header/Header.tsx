import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar, Nav, Container, NavDropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
  useSelector, useDispatch,
} from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../../redux/actions/userActions';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = useCallback(async () => {
    await dispatch(logout(history));
  }, [dispatch, history]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {Object.keys(userInfo || {}).length > 0 ? (
                <>
                  <Link to="/cart" className="text-decoration-none mx-1">
                    <Navbar.Text className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <p className="mx-1 my-1">Cart</p>
                    </Navbar.Text>
                  </Link>
                  <NavDropdown title={userInfo?.name || 'User'} id="userName">
                    <NavDropdown.Item>
                      <Link to="/profile">
                        Profile
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-decoration-none mx-1">
                    <Navbar.Text className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUser} />
                      <p className="m-1">Sign in</p>
                    </Navbar.Text>
                  </Link>
                  <Link to="/register" className="text-decoration-none mx-1">
                    <Navbar.Text className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUserPlus} />
                      <p className="m-1">Register</p>
                    </Navbar.Text>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

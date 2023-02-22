import Link from 'next/link';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { NonceProvider } from 'react-select';
import { useAuthToken, useLogout } from '../lib/withAuth';
import { useUser } from '../lib/useUser';

export default function NavigationBar() {
  const [aToken, setAToken] = useState();
  const [uData, setUData] = useState();
  const [authToken] = useAuthToken();
  const userData = useUser();
  console.log(userData?.data?.me?.username);

  useEffect(() => {
    setAToken(authToken);
    setUData(userData);
  }, [authToken, userData]);

  const logout = useLogout();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Trip Report</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {uData && aToken ? (
              <>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/tails">Tails</Nav.Link>
                <NavDropdown
                  title={userData?.data?.me?.username}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item
                    href="/account"
                    style={{ fontSize: '1.5em' }}
                  >
                    My Account
                  </NavDropdown.Item>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      fontFamily: " 'Sofia Sans', sans-serif",
                      padding: '0',
                      fontSize: '1.5em',
                    }}
                    onClick={logout}
                  >
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                  </button>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/login">Sign In</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// // import { NonceProvider } from 'react-select';
// import { useAuthToken, useLogout } from '../lib/withAuth';
// import { useUser } from '../lib/useUser';

// export default function NavigationBar() {
//   const [aToken, setAToken] = useState();
//   const [uData, setUData] = useState();
//   const [authToken] = useAuthToken();
//   const userData = useUser();
//   console.log(userData?.data?.me?.username);

//   useEffect(() => {
//     setAToken(authToken);
//     setUData(userData);
//   }, [authToken, userData]);

//   const logout = useLogout();

//   return (
//     <Navbar bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand href="/">Trip Report</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Nav>
//             {uData && aToken ? (
//               <>
//                 <Nav.Link href="/contact">Contact</Nav.Link>
//                 <Nav.Link href="/tails">Tails</Nav.Link>
//                 <Nav.Link href="/addtail">Add a Tail</Nav.Link>
//                 <NavDropdown
//                   title={userData?.data?.me?.username}
//                   id="navbarScrollingDropdown"
//                 >
//                   <NavDropdown.Item
//                     href="/account"
//                     style={{ fontSize: '1.5em' }}
//                   >
//                     My Account
//                   </NavDropdown.Item>
//                   <button
//                     type="button"
//                     style={{
//                       background: 'none',
//                       border: 'none',
//                       fontFamily: " 'Sofia Sans', sans-serif",
//                       padding: '0',
//                       fontSize: '1.5em',
//                     }}
//                     onClick={logout}
//                   >
//                     <NavDropdown.Item href="#">Logout</NavDropdown.Item>
//                   </button>
//                 </NavDropdown>
//               </>
//             ) : (
//               <>
//                 <Nav.Link href="/contact">Contact</Nav.Link>
//                 <Nav.Link href="/login">Sign In</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthToken, useLogout } from '../lib/withAuth';
import { useUser } from '../lib/useUser';

const pages = [
  { name: 'Contact', href: '/contact' },
  { name: 'Tails', href: '/tails' },
  { name: 'New Tail', href: '/newtail' },
];
const settings = ['Profile', 'Logout'];

export default function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Logout') {
      logout();
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AirplaneTicketIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRIP REPORT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      sx={{ textDecoration: 'none', color: 'black' }}
                      href={page.href}
                    >
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AirplaneTicketIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRIP REPORT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={page.href} sx={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'white' }}>{page.name}</Typography>
                </Link>
              </Button>
            ))}
          </Box>
          {uData && aToken ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Lisa Burgnon"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Link href="/login">
              <Typography sx={{ color: 'white', textDecoration: 'none' }}>
                LOGIN
              </Typography>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

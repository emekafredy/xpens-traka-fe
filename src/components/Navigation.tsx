import { FC, useState, MouseEvent } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Link
} from '@mui/material';
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAuthState, setUser } from '../store/slices/user';
import { renderSuccessMessage } from '../lib/utils';

const pages = ['Income', 'Expense', 'Budget'];
const settings = ['Account', 'Dashboard', 'Logout'];

export const Navigation:FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isAuthenticated, user } = useSelector(getUserAuthState);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logUserOut = async () => {
    await localStorage.removeItem('authToken');
    dispatch(
      setUser({
        isAuthenticated: false,
      })
    );
    renderSuccessMessage("User logout successful");
  }

  const handleOptionClick = (setting: string) => {
    if (setting === 'Logout') {
      return logUserOut();
    }
  }

  return (
    <AppBar
      style={{
        background: 'linear-gradient(to right bottom, #F5F5DC, #F9F6EE, #FFFFFF, #FAF9F6)',
        position: "fixed",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccountBalanceWalletIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#1876D1' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#1876D1',
              textDecoration: 'none',
            }}
          >
            X-Traka
          </Typography>

          {isAuthenticated && (
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
                  <Link
                    key={page}
                    onClick={handleCloseNavMenu}
                    href={`/${page}`}
                    sx={{
                      my: 2,
                      // color: 'black',
                      display: 'block',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      px: 2,
                      borderBottom: '1px solid',
                      color: '#1876D1'
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}
          
          {/* Mobile version */}
          <AccountBalanceWalletIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
              textDecoration: 'none'
            }}
          >
            X-Traka
          </Typography>

          {isAuthenticated && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Link
                    key={page}
                    onClick={handleCloseNavMenu}
                    href={`/${page}`}
                    sx={{
                      my: 2,
                      // color: 'white',
                      color: '#1876D1',
                      display: 'block',
                      mr: 6,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {page}
                  </Link>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Link onClick={handleOpenUserMenu} color="#FFFFFF">
                  <Tooltip title="Open settings">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="" sx={{ width: 35, height: 35 }} />
                    </IconButton>
                  </Tooltip>
                  <Typography textAlign="center" variant="caption" ml={1} sx={{ color: '#1876D1' }}>
                    Hi, {' '} {user?.attributes?.username}
                  </Typography>
                </Link>
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
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => handleOptionClick(setting)}
                        sx={{ color: '#1876D1' }}
                      >
                          {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;

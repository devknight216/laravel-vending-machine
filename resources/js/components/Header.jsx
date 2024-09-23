import * as React from 'react';
import { styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';

const Header = styled('header')(({ theme }) => [
  {
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    backgroundColor: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(8px)',
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
  },
]);

const HEIGHT = 60;

export default function AppHeader() {
  const { logout } = useAuth();
  return (
    <Header>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': `${HEIGHT}px`,
          },
        }}
      />
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: HEIGHT }}>
        <Link to="/">Home</Link>
        <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
      </Container>
    </Header>
  );
}

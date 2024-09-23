import React, { useState } from 'react';
import { Button, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { enqueueSnackbar } from 'notistack';

const Deposit = () => {
  const { currentUser, updateCurrentUser } = useAuth();

  const [amount, setAmount] = useState(5);

  const handleDeposit = () => {
    axios.post('/api/users/deposit', { amount }).then((response) => {
      enqueueSnackbar('Deposit successful', { variant: 'success', autoHideDuration: 3000 });
      const user = response.data?.user || currentUser
      updateCurrentUser(user);
    });
  };

  const handleResetDeposit = () => {
    axios.post('/api/users/reset').then((response) => {
      enqueueSnackbar('Deposit reset successfully', { variant: 'success', autoHideDuration: 3000 });
      const user = response.data?.user || currentUser
      updateCurrentUser(user);
    });
  };
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6">Balance: ${currentUser.deposit}</Typography>

      <ToggleButtonGroup value={amount} onChange={(_, value) => setAmount(value)} exclusive color="primary">
        <ToggleButton value={5}>5</ToggleButton>
        <ToggleButton value={10}>10</ToggleButton>
        <ToggleButton value={20}>20</ToggleButton>
        <ToggleButton value={50}>50</ToggleButton>
        <ToggleButton value={100}>100</ToggleButton>
      </ToggleButtonGroup>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="contained" color="primary" onClick={() => handleDeposit()}>Deposit</Button>
        <Button variant="contained" color="warning" onClick={() => handleResetDeposit()}>Reset Deposit</Button>
      </div>
    </Container>
  );
};

export default Deposit;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const Home = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get('/api/products');
    setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuy = (productId) => {
    axios.post(`/api/users/buy`, { productId })
      .then((response) => {
        fetchProducts();
        updateCurrentUser(response.data?.user || currentUser);
        enqueueSnackbar(response.data.message, { variant: 'success', autoHideDuration: 3000 });
      })
      .catch((error) => {
        console.error('Error buying product:', error);
        enqueueSnackbar(error.response.data.error, { variant: 'error', autoHideDuration: 3000 });
      });
  };


  return (
    <Container>
      <h1>Welcome, {currentUser.name}!</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h2>Your balance is ${currentUser.deposit}</h2>
        <div>
          <Button variant="contained" color="primary" onClick={() => navigate('/deposit')}>Deposit</Button>
        </div>
      </div>
      
      <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Amount Available</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">{row.amountAvailable}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleBuy(row.id)}>Buy</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;

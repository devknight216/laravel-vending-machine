import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();

  const fetchProducts = () => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data?.products?.filter(product => product.sellerId === currentUser.id) || []);
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = (id) => {
    axios.delete(`/api/products/${id}`).then(() => {
      enqueueSnackbar('Product deleted successfully', { variant: 'success', autoHideDuration: 3000 });
      fetchProducts();
    });
  };
  return (
    <Container>
      <h1>Products</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/products/create')}>
          Create Product
        </Button>
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
                  {currentUser.id === row.sellerId && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <Button variant="contained" color="primary" onClick={() => navigate(`/products/${row.id}`)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
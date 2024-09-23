import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Button, Container, FormControl, FormLabel, TextField } from '@mui/material';

export default function ProductForm() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    if (id === 'create') {
      setProduct({});
    } else {
      axios.get(`/api/products/${id}`).then((response) => {
        setProduct(response.data?.product || {});
      });
    }
  }, [id]);

  const handleSave = () => {
    if (id === 'create') {
      axios.post('/api/products', product).then((response) => {
        enqueueSnackbar('Product created successfully', { variant: 'success', autoHideDuration: 3000 });
        navigate(`/products/${response.data.product.id}`);
      });
    } else {
      axios.put(`/api/products/${id}`, product).then(() => {
        enqueueSnackbar('Product updated successfully', { variant: 'success', autoHideDuration: 3000 });
      });
    }

  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            id="name"
            name="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="cost">Cost</FormLabel>
          <TextField
            id="cost"
            name="cost"
            value={product.cost}
            type="number"
            onChange={(e) => setProduct({ ...product, cost: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="amountAvailable">Amount Available</FormLabel>
          <TextField
            id="amountAvailable"
            name="amountAvailable"
            value={product.amountAvailable}
            type="number"
            onChange={(e) => setProduct({ ...product, amountAvailable: e.target.value })}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Container>
  );
}

// AddressForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddressForm = () => {
  const [formData, setFormData] = useState({
    name : '',
    number:'',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Address Details
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          fullWidth
          label="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="number"
          name="numbert"
          value={formData.number}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Address
        </Button>
      </form>
    </Container>
  );
};

export default AddressForm;

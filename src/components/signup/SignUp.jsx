import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography, Card, CardContent, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function SignUp() {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signUp = (userData) => {
    delete userData.confirmPassword;

    axios.post('http://localhost:4000/user-api/sign-up', userData)
      .then((response) => {
        if (response.status === 201) {
          navigate('/login');
        }
        if (response.status !== 201) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.message);
        } else if (!err.response) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card elevation={2} sx={{ width: '80%', maxWidth: 400, borderRadius: '20px', padding: '20px',boxShadow:'0 8px 16px rgba(0, 0, 0, 0.5)' }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Register
          </Typography>

          {error.length !== 0 && <Typography variant='body2' color='error'>{error}</Typography>}

          <form onSubmit={handleSubmit(signUp)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: '*required field' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: '*required field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: '*required field' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: '*required field',
                validate: value => value === getValues('password') || 'Passwords do not match',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
              Already a user? Click <Link to='/login'>here</Link> to Login
            </Typography>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button variant="contained" type="submit" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                Register
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignUp;

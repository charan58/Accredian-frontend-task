import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Container, Typography, Link } from '@mui/material';
import { useContext } from 'react';
import { loginContext } from '../../contexts/loginContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    // getValues
  } = useForm();
  const navigate = useNavigate();
  const [currentUser, error, userLoginStatus, login, logout] = useContext(loginContext);

  const loginUser = (userObj) => {
    login(userObj);
  };

  useEffect(() => {
    if (userLoginStatus === true) {
      navigate('/user-profile');
    }
  }, [userLoginStatus]);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card elevation={3} sx={{ width: '80%', maxWidth: 400, borderRadius: '20px', padding: '20px',boxShadow:'0 8px 16px rgba(0, 0, 0, 0.5)' }}>
        <CardContent sx={{ padding: '30px' }}>
          <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Login
          </Typography>
          {error.length !== 0 && <Typography color='red' variant='p'>{error}</Typography>}
          <form onSubmit={handleSubmit(loginUser)}>
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
            <Typography variant='body2'>
              New to the App? Click <Link to='/login'>here</Link> to Register
            </Typography>
            <Box sx={{ textAlign: 'center', marginTop: 1 }}>
              <Button variant='contained' type="submit" style={{ color: '#fff', backgroundColor: '#0080FF' }}>
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;

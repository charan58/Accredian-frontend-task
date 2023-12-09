import React from 'react';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, Paper } from '@mui/material';

function Home() {
  return (
    <Paper elevation={0} style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      {/* Material-UI App Bar for Header */}
      <AppBar position="static" style={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ textAlign: 'center', margin: 'auto' }}>
            Simple Web App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Container */}
      <Container sx={{ padding: '20px' }}>
        {/* Material-UI Card for Content */}
        <Card elevation={3} style={{ marginTop: '20px', borderRadius: '20px' }}>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Welcome to our web application! This home page is crafted using Material-UI and React, focusing on delivering a seamless user experience.

              <br />
              <br />

              **Login Form:**
              <ul>
                <li>Username or Email (mandatory)</li>
                <li>Password (mandatory)</li>
              </ul>

              **Sign-Up Form:**
              <ul>
                <li>Username (mandatory)</li>
                <li>Email (mandatory)</li>
                <li>Password (mandatory)</li>
                <li>Confirm Password (mandatory)</li>
              </ul>

              *Design Considerations:*
              <ul>
                <li>
                  To achieve a modern and visually appealing design, Material-UI is leveraged for building components. The implementation includes form validation for mandatory fields, ensuring a user-friendly experience.
                </li>
              </ul>

              This web application is singularly focused on developing robust RESTful APIs for user authentication – both login and sign-up. Leveraging Express.js for the backend server, the commitment is to deliver a seamless user experience.

              <br />
              <br />

              **REST APIs for User Authentication:**
              <ul>
                <li>Create RESTful endpoints for user login and sign-up.</li>
              </ul>

              **Database Connectivity:**
              <ul>
                <li>
                  To ensure the security and integrity of user data, a solid connection is established between APIs and a MySQL database. The commitment to user privacy is evident in the proper handling of data, including the implementation of password encryption.
                </li>
              </ul>

              **Error Handling:**
              <ul>
                <li>
                  The system is equipped with comprehensive error handling mechanisms, from handling invalid credentials during login to preventing duplicate email entries during sign-up. This ensures a smooth and error-free user experience.
                </li>
              </ul>

              Join us on this journey as we shape the future of our platform, combining cutting-edge technology with an unwavering commitment to user satisfaction. We are at the forefront of these efforts, ensuring a seamless and secure experience for every user.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Paper>
  );
}

export default Home;

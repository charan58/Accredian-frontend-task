

import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/home/Home';
import Login from './components/login/Login';
import ErrorPage from './components/ErrorPage';
import SignUp from './components/signup/SignUp';
import UserProfile from './components/userprofile/UserProfile';

function App() {
  const routerObject = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/sign-up',
          element: <SignUp />,
        },
        {
          path: '/user-profile',
          element: <UserProfile />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={routerObject}/>
  );
}

export default App;

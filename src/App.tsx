//import { useState } from 'react';

import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/slices/login/slice';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = () => {
    const userData = { username: 'exampleUser' };
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <RouterProvider router={router} />
      <div className="App">
        {isAuthenticated ? (
          <div>
            <p>Welcome, {user.username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

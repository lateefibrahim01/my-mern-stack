import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import LoginPage from './components/LoginPage';
import TasksPage from './components/TasksPage';
import ProtectedRoute from './ProtectedRoutes';
import { logout } from './slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // Check token expiration on component mount and whenever auth.user changes
    checkTokenExpiration();
  }, [auth.user]);

  const checkTokenExpiration = () => {
    // Check if the user is authenticated and token has an expiresAt property
    if (auth.user && auth.user.expiresAt) {
      const tokenExpiration = new Date(auth.user.expiresAt).getTime();
      const currentTime = new Date().getTime();

      // If token has expired, dispatch logout action to clear the user state
      if (currentTime > tokenExpiration) {
        dispatch(logout());
      }
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Switch>
            <Route path="/login" component={LoginPage} />
            {/* Add other unprotected routes here, if any */}
            <ProtectedRoute path="/tasks" component={TasksPage} />
            {/* Add other protected routes here */}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
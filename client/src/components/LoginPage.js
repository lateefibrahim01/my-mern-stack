import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from '../slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleGoogleLogin = (googleResponse) => {
    const { tokenId } = googleResponse;
    dispatch(loginWithGoogle(tokenId));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Login Page</h1>
      {auth.loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <button
          onClick={() =>
            window.gapi.auth2
              .getAuthInstance()
              .signIn()
              .then(handleGoogleLogin)
              .catch((error) => console.error('Google Sign-In Error:', error))
          }
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300"
        >
          Login with Google
        </button>
      )}
      {auth.error && <p className="text-red-500 mt-4">Error: {auth.error}</p>}
      {auth.user && <p className="text-green-500 mt-4">Welcome, {auth.user}</p>}
    </div>
  );
};

export default LoginPage;

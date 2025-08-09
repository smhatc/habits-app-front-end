// SETUP
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";

import * as authService from "./services/authService";

// COMPONENT
const App = () => {
  const initialState = authService.getUser();

  const [user, setUser] = useState(initialState);

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData);
      setUser(res);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleSignIn = async (formData) => {
    try {
      const res = await authService.signIn(formData);
      setUser(res);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <Routes>
        {user ? (
          // Protected Routes
          <></>
        ) : (
          // Public Routes
          <>
            <Route
              path="/sign-up"
              element={<SignUp handleSignUp={handleSignUp} user={user} />}
            />
            <Route
              path="/sign-in"
              element={<SignIn handleSignIn={handleSignIn} user={user} />}
            />
          </>
        )}
        <Route path="/" element={<h1>Hello World!</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

// EXPORTING COMPONENT
export default App;

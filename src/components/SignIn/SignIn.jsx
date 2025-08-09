import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SignIn = ({ user, handleSignIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  let formIsInvalid = true;

  if (formData.username && formData.password) {
    formIsInvalid = false;
  }

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await handleSignIn(formData);
    if (result.success) {
      setFormData(initialState);
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          placeholder="Enter your username"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
        />
        <div>{error}</div>
        <button type="submit" disabled={formIsInvalid}>
          Sign In
        </button>
      </form>
    </>
  );
};

export default SignIn;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SignUp = ({ user, handleSignUp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const initialState = {
    username: "",
    password: "",
    passwordConf: "",
  };

  const [formData, setFormData] = useState(initialState);

  let formIsInvalid = true;

  if (
    formData.username &&
    formData.password &&
    formData.password === formData.passwordConf
  ) {
    formIsInvalid = false;
  }

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await handleSignUp(formData);
    if (result.success) {
      setFormData(initialState);
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          placeholder="Create a username"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={formData.password}
          placeholder="Create a password"
          type="password"
          onChange={handleChange}
        />
        <label htmlFor="password">Confirm Password</label>
        <input
          id="passwordConf"
          name="passwordConf"
          value={formData.passwordConf}
          placeholder="Confirm your password"
          type="password"
          onChange={handleChange}
        />
        <div>{error}</div>
        <button type="submit" disabled={formIsInvalid}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;

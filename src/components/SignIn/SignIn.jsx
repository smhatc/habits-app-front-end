import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import "./SignIn.css";

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
    <main>
      <h1 className="sign-in-header">Sign In</h1>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <label className="sign-in-form-label" htmlFor="username">
          Username
        </label>
        <input
          className="sign-in-form-input"
          id="username"
          name="username"
          value={formData.username}
          placeholder="Enter your username"
          type="text"
          onChange={handleChange}
        />
        <label className="sign-in-form-label" htmlFor="password">
          Password
        </label>
        <input
          className="sign-in-form-input"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
        />
        <div>{error}</div>
        <button
          className="sign-in-form-submitbtn"
          type="submit"
          disabled={formIsInvalid}
        >
          Sign In
        </button>
        <p>
          Don't have an account? <Link to={"/sign-up"}>Sign up</Link>.
        </p>
      </form>
    </main>
  );
};

export default SignIn;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import "./SignUp.css";

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
    <main>
      <h1 className="sign-up-header">Sign Up</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label className="sign-up-form-label" htmlFor="username">
          Username
        </label>
        <input
          className="sign-up-form-input"
          id="username"
          name="username"
          value={formData.username}
          placeholder="Create a username"
          type="text"
          onChange={handleChange}
        />
        <label className="sign-up-form-label" htmlFor="password">
          Password
        </label>
        <input
          className="sign-up-form-input"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Create a password"
          type="password"
          onChange={handleChange}
        />
        <label className="sign-up-form-label" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="sign-up-form-input"
          id="passwordConf"
          name="passwordConf"
          value={formData.passwordConf}
          placeholder="Confirm your password"
          type="password"
          onChange={handleChange}
        />
        <div>{error}</div>
        <button
          className="sign-up-form-submitbtn"
          type="submit"
          disabled={formIsInvalid}
        >
          Sign Up
        </button>
        <p>
          Already have an account? <Link to={"/sign-in"}>Sign in</Link>.
        </p>
      </form>
    </main>
  );
};

export default SignUp;

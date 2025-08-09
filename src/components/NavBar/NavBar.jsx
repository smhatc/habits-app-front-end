import { Link } from "react-router";

const NavBar = ({ user, handleSignOut }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
            <li>Welcome, {user.username}!</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

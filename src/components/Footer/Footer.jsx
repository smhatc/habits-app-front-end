import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="page-footer-branding">
        <Link to={"/"}>
          <img
            className="page-footer-branding-logo"
            src="/assets/images/logo.png"
            alt="HabitsApp Logo"
          />
        </Link>
        <p className="page-footer-branding-copyright">&copy; 2025 HabitsApp</p>
      </div>

      <p className="page-footer-contact">
        <Link
          to={"https://github.com/smhatc/habits-app-front-end"}
          target="_blank"
        >
          GitHub
        </Link>{" "}
        |{" "}
        <Link
          to={"https://www.flaticon.com/free-icons/calendar"}
          target="_blank"
        >
          Logo by Flaticon
        </Link>
      </p>
    </footer>
  );
};

export default Footer;

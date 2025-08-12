import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./Header.css";

const Header = ({ user, handleSignOut }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const navBtnRef = useRef(null);
  const profileToggleRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Toggle navigation menu (mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.body;

    const applyNavState = (open) => {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      if (navRef.current) {
        navRef.current.classList.toggle(
          "page-header-navigation-menuactive",
          open
        );
      }

      if (open) {
        body.classList.add("page-header-navigation-bodyactive");
        body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        body.classList.remove("page-header-navigation-bodyactive");
        body.style.paddingRight = "";
      }
    };

    applyNavState(navOpen);

    return () => {
      body.classList.remove("page-header-navigation-bodyactive");
      body.style.paddingRight = "";
      if (navRef.current)
        navRef.current.classList.remove("page-header-navigation-menuactive");
    };
  }, [navOpen]);

  // Sticky header opacity (adds/removes CSS class based on scroll)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 0)
        headerRef.current.classList.add("page-header-sticky");
      else headerRef.current.classList.remove("page-header-sticky");
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (typeof document === "undefined") return;

    const onDocClick = (e) => {
      if (!profileMenuRef.current || !profileToggleRef.current) return;
      const target = e.target;
      if (
        profileOpen &&
        !profileMenuRef.current.contains(target) &&
        !profileToggleRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [profileOpen]);

  const toggleNav = () => setNavOpen((s) => !s);
  const toggleProfile = () => setProfileOpen((s) => !s);

  return (
    <header ref={headerRef} className="page-header">
      <div className="page-header-branding">
        <Link to={"/"}>
          <img
            className="page-header-branding-logo"
            src="/assets/images/logo.png"
            alt="HabitsApp Logo"
          />
        </Link>
        <p className="page-header-branding-title">
          <Link to={"/"}>HabitsApp</Link>
        </p>
      </div>

      <div style={{ userSelect: "none", WebkitUserSelect: "none" }}>
        <nav ref={navRef} className="page-header-navigation" id="mobileNav">
          <ul className="page-header-navigation-list">
            <li className="page-header-navigation-list-link">
              <Link to={"/"} onClick={() => setNavOpen(false)}>
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li className="page-header-navigation-list-link">
                  <Link to={"/habits"} onClick={() => setNavOpen(false)}>
                    My Habits
                  </Link>
                </li>
                <li className="page-header-navigation-list-link">
                  <Link to={"/habits/new"} onClick={() => setNavOpen(false)}>
                    Add Habit
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="page-header-navigation-list-link sign-in-inside">
                  <Link
                    className="sign-in-link"
                    to={"/sign-in"}
                    onClick={() => setNavOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
                <li className="page-header-navigation-list-link sign-up-inside">
                  <Link
                    className="sign-up-link"
                    to={"/sign-up"}
                    onClick={() => setNavOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="page-header-controls">
          <button
            ref={navBtnRef}
            className="page-header-controls-navmenubtn"
            onClick={toggleNav}
          >
            {navOpen ? "✕" : "☰"}
          </button>

          {user && (
            <div className="profile-container header-controls-profile">
              <button
                ref={profileToggleRef}
                className="profile-picture"
                id="profileToggle"
                onClick={toggleProfile}
              >
                {user.username[0].toUpperCase()}
              </button>

              {profileOpen && (
                <div
                  ref={profileMenuRef}
                  className="profile-dropdown"
                  id="profileMenu"
                  role="menu"
                >
                  <div className="profile-user">{user.username}</div>
                  <Link
                    className="signout-button"
                    to="/"
                    onClick={(e) => {
                      setProfileOpen(false);
                      handleSignOut && handleSignOut(e);
                    }}
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

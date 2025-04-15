import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Mental Health App</h1>
        <div className="navbar-links">
          <a href="#about" className="navbar-link">
            About
          </a>
          <a href="#features" className="navbar-link">
            Features
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

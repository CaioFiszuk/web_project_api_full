import { useState } from "react";

function Header({userData, headerLink}) {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

    return(
        <header className={`header ${menuOpen ? 'open' : ''}`}>

          <h1 className="header__title">
          <img
            src="../images/around-the-us.png"
            alt="Around The US Logo"
            className="header__logo"
            id="logo"
          />
          </h1>

          <div className={`header__links ${menuOpen ? 'open' : ''}`}>
          <p className="header__user-info">
            {userData ? userData : ""}
          </p>
          
          <p className="header__user-info">
            {headerLink}
          </p>
          </div>

          <div className="header__icon" onClick={toggleMenu}>

          {menuOpen ? 
          <img src="../images/close-icon.png" alt="sandwich-menu-icon"/> 
          : 
          <img src="../images/sandwich-menu.png" alt="sandwich-menu-icon"/>
          }
          
          </div>

      </header>
    );
}

export default Header;

//{userData ? <img src="../images/sandwich-menu.png" alt="sandwich-menu-icon"/> : ""}

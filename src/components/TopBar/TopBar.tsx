import { NavLink } from "react-router-dom";
import "./TopBar.css";

function TopBar(){
    return(
      <div className="top-container">
          <img className="logo-top" src="/assets/logo.svg" alt="" />
          <div className="menus-container">
            <NavLink className="menu" to="/">Home</NavLink>
            <NavLink className="menu" to="/about-us">Sobre nós</NavLink>
            <NavLink className="menu" to="/contact">Entre em contato</NavLink>
          </div>
      </div>
    )
}

export default TopBar
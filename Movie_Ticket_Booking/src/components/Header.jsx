import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <div className="container">
            <div className="logo">
               <a href="/" ><h1><b>MyCinema</b></h1></a>
            </div>
            <div className="nav-bar">
                <ul className="nav-list">
                    <li className="nav-list-item"><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inActive")}> Home </NavLink></li>
                    {/* <li className="nav-list-item"><Link to="/contact" className={({ isActive }) => (isActive ? "active" : "inActive")}> Contact </Link></li> */}
                    <li className="nav-list-item"><NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "inActive")}> Contact </NavLink></li>
                    <li className="nav-list-item"><NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "inActive")}> About </NavLink></li>
                    {/* <li className="nav-list-item"><NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "inActive")}> Products </NavLink></li> */}
                    {/* <li className="nav-list-item">
                        <NavLinkLink to="/login"><button>Login</button></NavLinkLink>
                    </li> */}
                    <li className="nav-list-item"><NavLink to="/Login" className={({ isActive }) => (isActive ? "active" : "inActive")}><button>Login</button></NavLink></li>
                    {/* <li className="nav-list-item"><NavLink to="/Login" className={({ isActive }) => (isActive ? "active" : "inActive")}><button>Login</button></NavLink></li> */}
                    
                </ul>
            </div>
        </div>
    );
};

export default Header;

import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Technical Test
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/customers">
                        Customers
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/suppliers">
                        Suppliers
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/products">
                        Products
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/users">
                        Users
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/sales-invoices">
                        Sales Invoice
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/logout">
                        Logout
                    </NavLink>
                </div>
            </div>
        </nav>
    </React.Fragment>;
}
 
export default Navbar;
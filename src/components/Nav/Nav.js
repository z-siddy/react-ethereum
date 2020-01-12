import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3 mb-5rounded">
      <a className="navbar-brand" href="#">
        BUYTHEREUM
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" type="button" className="btn btn-warning">
              <b>Auction list</b>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to="/add" type="button" className="btn btn-warning">
              <b>Add an item</b>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

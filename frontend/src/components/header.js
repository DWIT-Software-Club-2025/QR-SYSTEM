import React from "react";
import { NavLink } from 'react-router-dom';
import softlogo from '../assets/softlogo.svg';

function Navbar() {
  return (
    <div className="font-sans bg-darkShade rounded-xl m-1 p-0">
      <div className="flex items-center justify-between h-16 px-4">
        <img src={softlogo} alt="Logo" className="h-14 " />
        <ul className="flex list-none font-bold space-x-11">
          <li>
            <NavLink to='/' className="text-textShade">Home</NavLink>
          </li>
          <li>
            <a href='http://localhost:8000/login' className="text-textShade">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
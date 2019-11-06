import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';

let activeStyle = {color: '#333030'}

const Navigation: React.FC = () => (
    <nav className="navigation">
        <ul className="navigation-list">
            <li>
                <NavLink to='/' exact activeStyle={activeStyle}>Home</NavLink>
            </li>
            <li>
                <NavLink to='/caesar' activeStyle={activeStyle}>Caesar</NavLink>
            </li>
            <li>
                <NavLink to='/affine' activeStyle={activeStyle}>Affine</NavLink>
            </li>
            <li>
                <NavLink to='/bacon' activeStyle={activeStyle}>Bacon</NavLink>
            </li>
        </ul>
    </nav>
);

export default Navigation;
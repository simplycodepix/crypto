import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';

let activeStyle = { color: '#333030' }

const navLinks = [
    {
        to: '/caesar',
        title: 'Caesar'
    },
    {
        to: '/affine',
        title: 'Affine'
    },
    {
        to: '/bacon',
        title: 'Bacon'
    },
    {
        to: '/vigenere',
        title: 'Vigenere'
    },
    {
        to: '/hill',
        title: 'Hill'
    },
    {
        to: '/hilldecode',
        title: 'Hill decode'
    },
    {
        to: '/hillanalyse',
        title: 'Hill analyse'
    }
]

const Navigation: React.FC = () => (
    <nav className="navigation">
        <ul className="navigation-list">
            <li>
                <NavLink to='/' exact activeStyle={activeStyle}>Home</NavLink>
            </li>
            {navLinks.map(link => (
                <li key={link.title}>
                    <NavLink to={link.to} activeStyle={activeStyle}>{link.title}</NavLink>
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation;
import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const Navigation: React.FC = () => (
    <nav className="navigation">
        <ul className="navigation-list">
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/caesar'>Caesar</Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;
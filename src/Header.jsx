import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from './assets/logo.png';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="header">
      <div className="header-right">
        <img src={logoImg} alt="لوجو همة" className="logo-img" />
      </div>

      <nav className="header-center">
        <ul className="nav-links">
          <li className={currentPath === '/' ? 'active' : ''}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              الرئيسية
            </Link>
          </li>
          <li className={currentPath === '/politics' ? 'active' : ''}>
            <Link to="/politics" style={{ textDecoration: 'none', color: 'inherit' }}>
              سياسة
            </Link>
          </li>
          <li>رياضة</li>
          <li>تعليم</li>
          <li>فن</li>
        </ul>
      </nav>

      <div className="header-left">
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="عن ماذا تبحث؟" />
        </div>
      </div>
    </header>
  );
}
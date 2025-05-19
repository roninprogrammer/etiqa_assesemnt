// components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
<header className="bg-white border-b shadow-sm">
  <nav className="max-w-screen-lg mx-auto px-4 py-3 flex justify-center items-center">
    <h1 className="text-lg font-bold text-gray-800">Trending Repos</h1>
  </nav>
</header>
  );
};


export default Header;

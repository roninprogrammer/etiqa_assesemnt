// App.jsx
import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import { FaStar, FaCog } from 'react-icons/fa';

const App = () => (
  <div className="flex flex-col h-screen">
    <Header />

   <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2">
      <HomePage />
    </main>


    <Footer />

  </div>
);

export default App;

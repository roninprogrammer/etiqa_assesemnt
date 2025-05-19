import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaCog } from 'react-icons/fa';



const Footer = () => {

 const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Trending',
      icon: FaStar,
      path: '/',
    },
    {
      label: 'Settings',
      icon: FaCog,
      path: '/settings',
    },
  ];


  return (
    <footer className="bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-[#f5f5f5] py-4 shadow-md dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex justify-around text-xs text-gray-700 dark:text-gray-300">
        {tabs.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <div
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center cursor-pointer ${isActive ? 'text-blue-600 font-semibold dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}
            >
              <Icon className={`text-lg mb-1 ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
              <span className={`leading-none text-sm ${isActive ? 'text-blue-600 font-semibold dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>{label}</span>
            </div>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;

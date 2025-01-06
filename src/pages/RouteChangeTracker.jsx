// src/components/RouteChangeTracker.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from './analytics'; // Adjust the path if necessary

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const pageId = `${path.replace(/\//g, '_')}_Page`; // e.g., '/about' becomes '_about_Page'
    const additionalInfo = `User viewed ${path} page`;

    logPageView(pageId, additionalInfo);
  }, [location]);

  return null; // This component doesn't render anything
};

export default RouteChangeTracker;

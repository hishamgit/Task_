// context/WindowWidthContext.js to check window width
import React, { createContext, useState, useEffect } from 'react';

const WindowWidthContext = createContext();

const WindowWidthProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);
// Function to handle window resize and set the state accordingly
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export { WindowWidthProvider, WindowWidthContext };


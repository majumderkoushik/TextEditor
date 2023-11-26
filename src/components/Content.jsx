// Content.js
import React from 'react';
import { useTheme } from './ThemeContext';
import Form from './Form';

const Content = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'dark-mode-content' : 'light-mode-content'}>
    <Form heading={"Enter Your Text Here"} />
    </div>
  );
};

export default Content;
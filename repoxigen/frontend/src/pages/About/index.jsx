import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Journey from './Journey';
import Advisor from './Advisor';
import Structure from './/Structure';

const About = () => {

  const location = useLocation();

  useEffect(() => {

    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <div className="pt-20">

      <Journey />
      <Advisor />
      <Structure />

    </div>
  );
};

export default About;
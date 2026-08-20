import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Consult from './Consult';
import FAQ from './FAQ';
import Location from './Location';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Consult />
      <FAQ />
      <Location />
    </>
  );
};

export default HomePage;
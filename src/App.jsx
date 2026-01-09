import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import { Toaster } from "./ui/toaster";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sejahtera Service - Service Electronic</title>
        <meta
          name="description"
          content="Layanan service electronic terpercaya untuk smartphone, laptop, tablet, dan perangkat elektronik lainnya."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden w-full max-w-full">
        <Header />
        <Hero />
        <Services />
        <Booking />
        <FAQ />
        <Contact />
        <Footer />
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;
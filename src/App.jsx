import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from "./ui/toaster";

function App() {
  return (
    <Router>
      <Helmet>
        <title>Sejahtera Service - Service Electronic</title>
        <meta
          name="description"
          content="Layanan service electronic terpercaya untuk smartphone, laptop, tablet, dan perangkat elektronik lainnya."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Gallery />
                <Booking />
                <Contact />
              </>
            }
          />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

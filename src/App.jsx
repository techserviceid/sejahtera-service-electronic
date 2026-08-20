import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from "./ui/toaster";

function App() {
  return (
    <>
      <Helmet>
        <title>Sejahtera Service - Service Electronic</title>
        <meta
          name="description"
          content="Layanan service electronic terpercaya untuk smartphone, laptop, tablet, dan perangkat elektronik lainnya."
        />
      </Helmet>

      <ScrollToTop />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden w-full max-w-full">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>

        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
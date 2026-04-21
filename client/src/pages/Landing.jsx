import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import Demo from '../components/landing/Demo';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import WhyUs from '../components/landing/WhyUs';

const Landing = () => {
    return (
        <div className="min-h-screen font-sans text-gray-900 bg-white">
            <Navbar />
            <Hero />
            <Demo />
            <Features />
            <HowItWorks />
            <WhyUs />
            <Footer />
        </div>
    );
};

export default Landing;

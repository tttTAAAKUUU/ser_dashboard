import React from 'react';
import Hero from '@/components/Hero';
import { Separator } from '@/components/ui/separator';
import Join from '@/components/Join';
import FAQ from '@/components/FAQ';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div className="scroll-smooth">
      <Navbar />
      
      {/* Hero stays dark */}
      <section id="hero">
        <Hero />
      </section>

      <section id="join" className="bg-white text-black">
        <Join />
      </section>

      <section id="about" className="bg-white text-black">
        <About />
      </section>

      <section id="faq" className="bg-white text-black">
        <FAQ />
      </section>

      <section id="contact" className="bg-white text-black">
        <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
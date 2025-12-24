import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Services from '../components/Services';
import Work from '../components/Work';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CommunityLeadMagnet from '../components/CommunityLeadMagnet';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <SocialProof />
      <Pricing />
      <FAQ />
      <CommunityLeadMagnet />
    </>
  );
};

export default Home;
import React from "react";
import Hero from "./Hero";
import Navigation from "./Navigation";
import About from "./About";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Footer />
    </div>
  );
}

export default LandingPage;

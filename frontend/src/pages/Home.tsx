import FaqsSection from "../components/FaqsSection";
import Footer from "../components/Footer";
import AboutUsSection from "../components/AboutUsSection";
import WhyShouldYouPlaySection from "../components/WhyShouldYouPlaySection";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="why-play">
        <WhyShouldYouPlaySection />
      </div>
      <div id="about">
        <AboutUsSection />
      </div>
      <div id="faqs">
        <FaqsSection />
      </div>
      <Footer />
    </>
  );
};

export default Home;

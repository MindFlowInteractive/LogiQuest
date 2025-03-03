import FaqsSection from "../components/FaqsSection";
import Footer from "../components/Footer";
import AboutUsSection from "../components/AboutUsSection";
import WhyShouldYouPlaySection from "../components/WhyShouldYouPlaySection";
import Navbar from "../components/Navbar";
import ContributorsSection from "../components/ContributorsSection";

const Home = () => {
  return (
    <>
      {/* paste your page component below here */}
      

        <Navbar />
         <WhyShouldYouPlaySection/>
        <FaqsSection/>
        <ContributorsSection />
        <AboutUsSection />
        <Footer />
      {/* paste your page component above here */}
    </>
  );
};

export default Home;

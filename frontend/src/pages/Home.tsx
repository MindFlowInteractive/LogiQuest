import FaqsSection from "../components/FaqsSection";
import HowToPlay from "../components/HowToPlay";
import Footer from "../components/Footer";
import AboutUsSection from "../components/AboutUsSection";
import WhyShouldYouPlaySection from "../components/WhyShouldYouPlaySection";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection ";
import ProfileForm from "../components/ProfileForm";
const Home = () => {
	return (
		<>
			{/* paste your page component below here */}

			<Navbar />
			<HeroSection />
			<WhyShouldYouPlaySection />
			<FaqsSection />
			<AboutUsSection />
			<ProfileForm />
			<Footer />
			{/* paste your page component above here */}
		</>
	);
  
};

export default Home;

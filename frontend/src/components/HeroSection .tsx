import MergedPeople from "../assets/merged.png";
import BackgroundImage from "../assets/background.png";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="pl-6 md:pl-20 mt-10 pt-20 min-h-screen text-white text-left"
    >
      <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto w-full">
        <div className="flex-1 text-left md:mt-[-100px] md:text-left">
          <h1 className="text-2xl sm:text-[25px] font-bold leading-tight">
            Welcome to <span className="text-yellow-500">LogiQuest!</span>
          </h1>
          <p className="mt-2 text-lg sm:text-[20px]">
            An engaging web-based game designed to <br />
            challenge your logic and knowledge! Whether <br />
            you're a trivia master or just looking to have <br />
            some fun.
          </p>
          <button  className="mt-8 bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-9 py-3 rounded-md shadow-md transition">
            Get Started
          </button>
        </div>
        <div className="relative flex justify-center md:justify-end mt-10 md:mt-[-20px] md:mr-[-15px] w-full md:w-auto">
          <img
            src={MergedPeople}
            alt="Game Characters"
            className="w-[600px] max-w-full"
          />

          {/* <button className="hidden sm:block absolute left-[10%] bottom-[10%] md:left-10 md:bottom-20 bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-20 py-5 rounded-md shadow-md transition">
            Get Started
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

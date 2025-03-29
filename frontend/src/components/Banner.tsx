import Coins from "../assets/coins.png";

const Banner = () => {
  return (
    <div className="bg-[#111f1f] text-white px-4 py-6 md:py-0 flex flex-col md:flex-row items-center border border-gray-700 rounded-2xl shadow-lg mt-12 md:mt-[50px] space-y-4 md:space-y-0 md:gap-10 lg:gap-16">
      {/* Icon */}
      <div className="flex-shrink-0">
        <img
          src={Coins}
          alt="Coins"
          className="w-[150px] md:w-[180px] lg:w-[208px] h-auto"
        />
      </div>

      <div className="text-center md:text-left max-w-lg md:max-w-2xl">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-cyan-400">
          Join the Adventure!
        </h2>
        <p className="mt-2 text-sm md:text-base lg:text-lg font-light tracking-wide">
          Embark on your journey with LogiQuest today! Test your skills,
          challenge your friends, and discover the joy of learning through play.
        </p>
      </div>
    </div>
  );
};

export default Banner;

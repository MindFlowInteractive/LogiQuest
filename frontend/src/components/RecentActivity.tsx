import Coin from "../assets/coin.png";
import Fifty from "../assets/50.png";
import Call from "../assets/call.png";
import Audience from "../assets/audience.png";
import Avatar from "../assets/avatar.png";
import Component from "../assets/component.png";
import Back from "../assets/back.png";
import Banner from "./Banner";
import GameMode from "./GameMode";
import CoinBag from "../assets/coinbag.png";
import Adventure from "../assets/adventure.png";
import Timed from "../assets/timed.png";
import Endless from "../assets/endless.png";
import Daily from "../assets/daily.png";
import Practice from "../assets/practice.png";
import Challenge from "../assets/challenge.png";
import Classic from "../assets/classic.png";
import Robert from "../assets/robert.png";
import Abbas from "../assets/abbas.png";
import John from "../assets/john.png";
import Duncan from "../assets/ducan.png";
import John2 from "../assets/john2.png";
import Sam from "../assets/sam.png";
import Duncan2 from "../assets/duncan.png";
import Coinn from "../assets/coinns.png";
import Johncoin from "../assets/johncoin.png";
import Ducancoin from "../assets/ducancoin.png";
import Samcoin from "../assets/samcoin.png";
import Dunancoin2 from "../assets/ducancoin2.png";
import Robertcoin from "../assets/johncoin2.png";

const RecentActivity = () => {
  const players = [
    { name: "Abbas", avatar: Abbas, coin: Coinn },
    { name: "John", avatar: John, coin: Johncoin },
    { name: "Robert", avatar: Robert, coin: Ducancoin },
    { name: "Duncan", avatar: Duncan, coin: Johncoin },
    { name: "Sam", avatar: Sam, coin: Samcoin },
    { name: "John", avatar: John2, coin: Robertcoin },
    { name: "Duncan", avatar: Duncan2, coin: Dunancoin2 },
  ];

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-6">
      {/* Navbar */}
      <nav className="flex flex-wrap justify-between items-center py-4 border-b border-gray-700 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="LogiQuest Logo" className="h-10 md:h-12" />
          <span className="text-lg md:text-xl font-bold">LogiQuest</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-yellow-400 text-sm md:text-base">
          <span>Store</span>
          <span>Game mode</span>
          <span>Setting</span>
          <span>Coins</span>
          <img src={Coin} alt="" className="w-5 h-5" />
          <span>Call a friend</span>
          <img src={Call} alt="" className="w-5 h-5" />
          <span>50:50</span>
          <img src={Fifty} alt="" className="w-5 h-5" />
          <span>Audience</span>
          <img src={Audience} alt="" className="w-5 h-5" />
          <span>🔔</span>
          <img src={Component} alt="" className="w-5 h-5" />
          <img src={Avatar} alt="User" className="h-8 w-8 rounded-full" />
        </div>
      </nav>

      {/* Back Button */}
      <div className="my-4">
        <a href="">
          <img src={Back} alt="Back" className="w-6 md:w-8" />
        </a>
      </div>

      <Banner />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Section */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold underline mb-4">RECENT</h3>
          <div className=" grid grid-cols-1 sm:grid-cols-2 p-4 gap-4">
            {[
              { name: "Puzzle Game Mode", image: CoinBag },
              { name: "Endless Game Mode", image: Endless },
              { name: "Adventure Game Mode", image: Adventure },
              { name: "Daily Challenge Game Mode", image: Daily },
              { name: "Practice Game Mode", image: Practice },
              { name: "Challenge Game Mode", image: Challenge },
              { name: "Timed Blitz Game Mode", image: Timed },
              { name: "Classic Game Mode", image: Classic },
            ].map((game, index) => (
              <div
                key={index}
                className="flex justify-between bg-black text-gray-400 p-3 rounded-lg border border-gray-700 h-[168px]"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-[133px] max-w-xs md:h-auto object-cover rounded-md"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-sm">{game.name}</h4>
                  <p>Level {index + 6}</p>
                  <GameMode />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Players Section */}
        <div>
          <h3 className="text-lg font-bold underline mb-4">PLAYERS</h3>
          <div className="bg-black p-4 rounded-lg text-gray-400 border border-gray-700 h-[546px] overflow-y-auto">
            {players.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{player.name}</span>
                </div>
                <div>
                  <span className="mr-2">Level </span>
                  <span>{56 - index * 3}</span>
                </div>
                <div className="flex gap-2">
                  <span>{50000 - index * 5000}</span>
                  <img src={player.coin} alt="" className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;

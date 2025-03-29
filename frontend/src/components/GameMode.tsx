import Icon from "../assets/icon.png";
import Audience from "../assets/audience.png";
import Call from "../assets/call.png";
import Fifty from "../assets/fifty.png";

const GameMode = () => {
  return (
    <div className="bg-black text-white p-2 sm:p-3 md:w-60 sm:w-full h-auto w-full max-w-[190px] rounded-lg mx-auto">
      <div className="mt-0 space-y-1">
        <div className="flex justify-between items-center">
          <img
            src={Audience}
            alt="Audience"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-yellow-500 font-bold flex items-center gap-x-1 text-sm">
            10 <img src={Icon} alt="Icon" className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <img src={Call} alt="Call" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-yellow-500 font-bold flex items-center gap-x-1 text-sm">
            12 <img src={Icon} alt="Icon" className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <img src={Fifty} alt="Fifty" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-yellow-500 font-bold flex items-center gap-x-1 text-sm">
            8 <img src={Icon} alt="Icon" className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameMode;

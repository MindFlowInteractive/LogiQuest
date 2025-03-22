interface GameButtonProps {
  text?: string;
  href?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  glowColor?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const GameButton: React.FC<GameButtonProps> = ({
  text = "Button",
  href = "#",
  borderColor = "bg-blue-500",
  bgColor = "bg-blue-700",
  textColor = "text-white",
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative w-56 h-12 inline-block cursor-pointer transition-all duration-200 hover:brightness-125"
    >
      <div
        className={`absolute inset-0 ${borderColor} transition-all duration-300`}
        style={{
          clipPath:
            "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
        }}
      ></div>

      <div
        className={`absolute inset-0 m-0.5 ${bgColor} flex items-center justify-center font-prompt ${textColor} font-bold text-lg transition-all duration-200`}
        style={{
          clipPath:
            "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
        }}
      >
        {text}
      </div>
    </a>
  );
};

export default GameButton;

import React, { forwardRef } from "react";

interface GameActionButtonProps {
  text?: string;
  href?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const GameActionButton = forwardRef<HTMLAnchorElement, GameActionButtonProps>(
  (
    {
      text = "Button",
      href = "#",
      borderColor = "bg-blue-500",
      bgColor = "bg-blue-700",
      textColor = "text-white",
      onClick,
    },
    ref
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={`relative w-56 h-12 inline-block cursor-pointer transition-all duration-200 hover:brightness-125 
          focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400`}
      >
        <div
          className={`absolute inset-0 ${borderColor} transition-all duration-300`}
          style={{
            clipPath:
              "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
          }}
        ></div>

        <div
          className={`absolute inset-0 m-0.5 ${bgColor} flex items-center justify-center font-prompt ${textColor} transition-all duration-200
            focus-visible:bg-yellow-600`}
          style={{
            clipPath:
              "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)",
          }}
        >
          <p className="font-bold text-sm md:text-lg">{text}</p>
        </div>
      </a>
    );
  }
);

export default GameActionButton;

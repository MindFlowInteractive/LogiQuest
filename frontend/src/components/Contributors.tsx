import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useQuery } from '@tanstack/react-query';
import { fetchContributors } from '../services/ContributorsService';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

const Contributors: React.FC = () => {
  const { data: contributors, isLoading, error } = useQuery<Contributor[]>({
    queryKey: ['contributors'],
    queryFn: fetchContributors,
  });

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5, // ✅ Ensure 5 slides in a row
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center space-x-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-24 h-24 bg-gray-300 rounded-full"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Failed to load contributors.</p>;
  }

  return (
    <div className="px-4 py-12 min-h-screen bg-teal-900 text-white">
      <h2 className="text-center text-4xl font-bold mb-10 text-teal-300 tracking-wide">
        Meet Our Contributors
      </h2>

      <Slider {...settings}>
        {contributors?.map((contributor) => (
          <div key={contributor.login} className="px-2">
            <div className="relative group">
              {/* 🔥 Visible animated border */}
              <div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-teal-400 animate-glow"></div>

              {/* ✅ Matching section and card styles */}
              <div className="relative bg-teal-800 shadow-lg rounded-xl p-6 text-center h-[450px] flex flex-col justify-center items-center transition-transform duration-300 transform group-hover:scale-105">
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-64 h-64 rounded-full border-4 border-teal-500 shadow-lg transition-all duration-300 group-hover:shadow-teal-400"
                />
                <p className="mt-4 text-2xl font-semibold text-white">{contributor.login}</p>
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-300 text-lg mt-3 font-medium transition-colors duration-300 hover:text-teal-200"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* ✅ Improved glowing border animation */}
      <style>
        {`
          @keyframes glow {
            0% { border-color: transparent; box-shadow: 0 0 0px teal; }
            50% { border-color: teal; box-shadow: 0 0 20px teal; }
            100% { border-color: transparent; box-shadow: 0 0 0px teal; }
          }
          .animate-glow {
            animation: glow 3s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Contributors;

import React from "react";

interface Contributor {
  id: number;
  name: string;
  avatarUrl: string;
  profileUrl: string;
}

// Static contributors data – replace or extend with dynamic data if needed
const contributors: Contributor[] = [
  {
    id: 1,
    name: "John Doe",
    avatarUrl: "https://avatars.githubusercontent.com/u/12345678?v=4",
    profileUrl: "https://github.com/johndoe",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatarUrl: "https://avatars.githubusercontent.com/u/87654321?v=4",
    profileUrl: "https://github.com/janesmith",
  },
  // Add more contributors as needed
];

const ContributorsSection: React.FC = () => {
  return (
    <section aria-label="Contributors" className="py-16 px-4 bg-whychoseus">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12 font-prompt">
          Contributors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {contributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={contributor.avatarUrl}
                alt={`${contributor.name}'s avatar`}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200"
              />
              <span className="text-lg font-medium text-gray-800 font-prompt">
                {contributor.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributorsSection;

import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchContributors } from "../services/ContributorsService";

// Define the expected structure of contributor data
interface Contributor {
  username: string;
  avatar: string;
  profile: string;
}

interface ProfileCardProps {
  name: string;
  title: string;
  imageSrc: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, imageSrc }) => (
  <div className="w-[353px] flex-shrink-0 h-full flex flex-col justify-center items-center gap-2">
    <figure className="w-full h-[547px]">
      <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
    </figure>
    <div className="flex flex-col gap-1">
      <h5 className="font-semibold text-[21px] capitalize">{name}</h5>
      <p className="font-light text-[21px]">{title}</p>
    </div>
  </div>
);

const ContributorsSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Explicitly type contributors as an array of Contributor objects
  const { data: contributors = [], isLoading, error } = useQuery<Contributor[]>({
    queryKey: ["contributors"],
    queryFn: fetchContributors,
  });

  const startAutoScroll = () => {
    if (scrollIntervalRef.current !== null) return;
    scrollIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 2;
        if (
          containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 20);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  if (isLoading) return <p>Loading contributors...</p>;
  if (error) return <p>Failed to load contributors.</p>;

  return (
    <section className="w-full h-full">
      <div
        className="w-full h-[615px] overflow-hidden relative"
        ref={containerRef}
        onMouseEnter={startAutoScroll}
        onMouseLeave={stopAutoScroll}
      >
        <div
          className="flex h-full gap-5"
          style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
        >
          {contributors.map((contributor: Contributor) => (
            <ProfileCard
              key={contributor.username}
              name={contributor.username}
              title="Open Source Contributor"
              imageSrc={contributor.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributorsSlider;

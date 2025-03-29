import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchContributors } from "../services/ContributorsService";

 feat/RecentGameActivity
// Dummy data for contributor profiles
const profileData = [
  {
    id: 1,
    name: "Abdulrazik Abdulsamad",
    title: "Full Stack Web Developer",
    imageSrc: "/svg/image1.svg",
  },
  {
    id: 2,
    name: "Hamid Khalid",
    title: "Full Stack Web Developer",
    imageSrc: "/svg/image2.svg",
  },
  {
    id: 3,
    name: "Jamilu Abbas",
    title: "Full Stack Web Developer",
    imageSrc: "/svg/image3.svg",
  },
  {
    id: 4,
    name: "Abdulrazik Abdulsamad",
    title: "Full Stack Web Developer",
    imageSrc: "/svg/image4.svg",
  },
  {
    id: 5,
    name: "Abdulrazik Abdulsamad",
    title: "Full Stack Web Developer",
    imageSrc: "/svg/image3.svg",
  },
];

interface ProfileCardProps {

interface Contributor {
  id: number;
 main
  name: string;
  title: string;
  imageSrc: string;
  profileUrl: string;
}

 feat/RecentGameActivity
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

 feat/RecentGameActivity
// Slider Component
const ProfileSlider: React.FC = () => {
  const cardWidth = 353 + 20; // Card width + gap
  const visibleCards = Math.floor(window.innerWidth / cardWidth) || 1;
  const maxIndex = Math.max(0, profileData.length - visibleCards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);


 main
const ContributorsSlider: React.FC = () => {
 main
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["contributors"],
    queryFn: fetchContributors,
  });

  const contributors: Contributor[] = data
    ? data.map((contributor: any): Contributor => ({
        id: contributor.id,
        name: contributor.login,
        title: "Contributor",
        imageSrc: contributor.avatar_url,
        profileUrl: `https://github.com/${contributor.login}`,
      }))
    : [];

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
 feat/RecentGameActivity
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, cardWidth]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;

    // Calculate the new offset
    const newOffset = clientX - dragStartX;

    // Limit the drag beyond boundaries with resistance
    if (
      (currentIndex === 0 && newOffset > 0) ||
      (currentIndex === maxIndex && newOffset < 0)
    ) {
      setDragOffset(newOffset / 3); // Add resistance when dragging beyond limits
    } else {
      setDragOffset(newOffset);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    // Determine if we should move to the next/previous card
    if (dragOffset < -threshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    // Reset drag state
    setIsDragging(false);
    setDragOffset(0);
  };

  const getTransformValue = () => {
    let transform = -(currentIndex * cardWidth) + dragOffset;

    // Apply boundaries
    if (currentIndex === 0 && dragOffset > 0) {
      transform = dragOffset / 3;
    } else if (currentIndex === maxIndex && dragOffset < 0) {
      transform = -(maxIndex * cardWidth) + dragOffset / 3;
    }

    return transform;

    }, 20);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
 main
  };

  if (isLoading) {
    return (
      <div className="w-full h-[615px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[615px] flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-medium text-lg">Unable to load contributors</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full h-full">
      <div
        className="w-full h-[615px] overflow-hidden relative"
        ref={containerRef}
 feat/RecentGameActivity
      >
        <main
          className={`h-full flex ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex h-full gap-5"
            style={{
              transform: `translateX(${getTransformValue()}px)`,
              transition: isDragging ? "none" : "transform 0.5s ease-out",
            }}
          >
            {profileData.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>
        </main>

        onMouseEnter={startAutoScroll}
        onMouseLeave={stopAutoScroll}
      >
        <div className="flex h-full gap-5" style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}>
          {contributors.map((profile: Contributor) => (
            <div key={profile.id} className="w-[353px] flex-shrink-0 h-full flex flex-col justify-center items-center gap-2">
              {/* Clickable Avatar with Updated Mask */}
              <figure className="w-full h-[547px]">
                <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                  <svg width="353" height="547" viewBox="0 0 353 547" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <clipPath id={`avatarMask-${profile.id}`}>
                        <path d="M0 0L353 71V547L0 485.444V0Z" />
                      </clipPath>
                    </defs>
                    <image
                      x="0"
                      y="0"
                      width="353"
                      height="547"
                      xlinkHref={profile.imageSrc}
                      clipPath={`url(#avatarMask-${profile.id})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </svg>
                </a>
              </figure>

              {/* Clickable Name & Title */}
              <div className="flex flex-col gap-1 text-center">
                <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[21px] capitalize text-blue-600 hover:underline">
                  {profile.name}
                </a>
                <p className="font-light text-[21px]">{profile.title}</p>
              </div>
            </div>
          ))}
        </div>
 main
      </div>
    </section>
  );
};

 feat/RecentGameActivity
export default ProfileSlider;

export default ContributorsSlider;
 main

import React, { useState, useRef, useEffect } from "react";

// Dummy data for profiles
const profileData = [
  { id: 1, name: "Abdulrazik Abdulsamad", title: "Full Stack Web Developer", imageSrc: "/svg/image1.svg" },
  { id: 2, name: "Hamid Khalid", title: "Full Stack Web Developer", imageSrc: "/svg/image2.svg" },
  { id: 3, name: "Jamilu Abbas", title: "Full Stack Web Developer", imageSrc: "/svg/image3.svg" },
  { id: 4, name: "Abdulrazik Abdulsamad", title: "Full Stack Web Developer", imageSrc: "/svg/image4.svg" },
  { id: 5, name: "Abdulrazik Abdulsamad", title: "Full Stack Web Developer", imageSrc: "/svg/image3.svg" },
];

// Profile Card Component
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

// Slider Component
const ProfileSlider: React.FC = () => {
  const cardWidth = 353 + 20; // Card width + gap
  const visibleCards = Math.floor(window.innerWidth / cardWidth) || 1;
  const maxIndex = Math.max(0, profileData.length - visibleCards);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const threshold = 50;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = Math.floor(window.innerWidth / cardWidth) || 1;
      const newMaxIndex = Math.max(0, profileData.length - newVisibleCards);
      // Ensure current index is still valid after resize
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    if ((currentIndex === 0 && newOffset > 0) || 
        (currentIndex === maxIndex && newOffset < 0)) {
      setDragOffset(newOffset / 3); // Add resistance when dragging beyond limits
    } else {
      setDragOffset(newOffset);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    // Determine if we should move to the next/previous card
    if (dragOffset < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    } else if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
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
      transform = -(maxIndex * cardWidth) + (dragOffset / 3);
    }
    
    return transform;
  };

  return (
    <section className="w-full h-full">
      <div className="w-full h-[615px] overflow-hidden relative" ref={containerRef}>
        <main
          className={`h-full flex ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
              transition: isDragging ? 'none' : 'transform 0.5s ease-out'
            }}
          >
            {profileData.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>
        </main>
      </div>
      
     
    </section>
  );
};

export default ProfileSlider;
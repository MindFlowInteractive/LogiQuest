import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchContributors } from "../services/ContributorsService";

interface Contributor {
    id: number;
    name: string;
    title: string;
    imageSrc: string;
    profileUrl: string;
}

const ContributorsSlider: React.FC = () => {
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
        }, 20);
    };

    const stopAutoScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
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
            </div>
        </section>
    );
};

export default ContributorsSlider;
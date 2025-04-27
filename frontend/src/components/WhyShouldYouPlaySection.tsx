
export default function WhyShouldYouPlaySection() {
    return (
        <main className="min-h-screen bg-[#0a3b3b]">
            <section className="container mx-auto py-12 pr-4 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative -ml-2">
                        <div className="relative overflow-hidden rounded-tr-[100px]  ">
                            <div className="absolute inset-0 border-r-4 border-t-4 border-[#ff5533] rounded-tr-[100px]"></div>
                            <div className=" ">
                                <img
                                    src="/playImg.png"
                                    alt=""
                                    className="object-left]"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="text-white space-y-8 px-4 md:px-8">
                        <h2 className="text-xl lg:text-2xl font-bold">Why Should You Play?</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg lg:text-xl font-semibold mb-3">Learning Opportunities</h3>
                                <p className="text-base lg:text-md">
                                    Incorporate games and challenges that promote learning in various subjects, enhancing users' knowledge
                                    while they play. Design activities that target specific skills, such as problem- solving, critical
                                    thinking, and creativity.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg lg:text-xl font-semibold mb-3">Cognitive Benefits</h3>
                                <p className="text-base lg:text-md">
                                    Brain Training Games: Offer puzzles and games that are scientifically designed to improve memory,
                                    attention, and cognitive function.
                                </p>
                                <p className="text-base lg:text-md mt-4">
                                    Progress Tracking: Allow users to track their improvement over time, reinforcing their learning
                                    journey and encouraging continuous engagement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

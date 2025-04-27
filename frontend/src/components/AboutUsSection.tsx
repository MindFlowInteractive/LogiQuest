import ProfileSlider from "./ProfileSlider";

const AboutUsSection = () => {
    return (
        <section className="  flex flex-col items-center justify-center gap-6  bg-slate-950 text-white font-inter">
            <main className=" w-full h-[100vh] relative ">
                <main className="relative w-full h-full">
                    <div className="w-1/2 h-full  overflow-hidden absolute left-0 top-0">
                        <img
                            src="svg/shapey1.svg"
                            alt=""
                            className="rotate-[-4deg] w-[720px] h-[512px] absolute top-0 -left-[300px]"
                        />
                        <img
                            src="svg/shapey2.svg"
                            alt=""
                            className="rotate-[-4deg] w-[720px] h-[512px] absolute -top-[60px] -left-[200px] "
                        />
                        <img
                            src="svg/shapey3.svg"
                            alt=""
                            className="rotate-[-4deg] w-[720px] h-[512px] absolute -top-[60px] -left-[250px]"
                        />
                        <img
                            src="svg/shapey1.svg"
                            alt=""
                            className="rotate-[120deg] w-[720px] h-[512px] absolute top-[150px] -left-[300px]"
                        />
                        <img
                            src="svg/shapey2.svg"
                            alt=""
                            className="rotate-[120deg] w-[720px] h-[512px] absolute top-[250px] -left-[350px] "
                        />
                        <img
                            src="svg/shapey3.svg"
                            alt=""
                            className="rotate-[120deg] w-[720px] h-[512px] absolute top-[200px] -left-[250px]"
                        />
                    </div>
                    <div className=" w-1/2 h-full overflow-hidden absolute right-0  rotate-180">
                        <img
                            src="svg/shapey1.svg"
                            alt=""
                            className="rotate-[-4deg] w-[720px] h-[512px] absolute bottom-0 -left-[300px]"
                        />
                        <img
                            src="svg/shapey2.svg"
                            alt=""
                            className="rotate-[-4deg] w-[720px] h-[512px] absolute -bottom-[60px] -left-[200px] "
                        />
                        <img
                            src="svg/shapey3.svg"
                            alt=""
                            className="rotate-[-4deg] w-[720px] h-[512px] absolute -bottom-[60px] -left-[250px]"
                        />
                    </div>
                </main>
                <main className="absolute h-[563px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
                    <h1 className="text-3xl md:text-4xl lg:text-3xl font-bold text-center">
                        About Us
                    </h1>
                    <p className="max-w-3xl text-2xl font-light text-center md:text-justify leading-relaxed">
                        LogiQuest is an engaging web-based game designed to challenge your
                        logic and knowledge! Whether you're a trivia master or just looking
                        to have some fun, LogiQuest offers a variety of game modes to suit
                        every player.
                    </p>
                </main>
            </main>
            <main className=" w-full h-[989px]  relative space-y-64 -mt-64 pt-12 px-4">
                <h1 className="text-3xl md:text-[45px] lg:text-3xl font-bold text-center">
                    Contributors
                </h1>

                <ProfileSlider />
            </main>
        </section>
    );
};

export default AboutUsSection;
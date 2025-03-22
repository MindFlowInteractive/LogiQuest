const AboutUsSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-6 p-6 md:p-12 lg:p-16 bg-slate-950 text-white font-inter">
      <h1 className="text-3xl md:text-4xl lg:text-3xl font-bold text-center">
        About Us
      </h1>
      <p className="max-w-3xl text-lg text-center md:text-justify leading-relaxed">
        LogiQuest is an engaging web-based game designed to challenge your logic
        and knowledge! Whether you're a trivia master or just looking to have
        some fun, LogiQuest offers a variety of game modes to suit every player.
      </p>
    </section>
  );
};

export default AboutUsSection;

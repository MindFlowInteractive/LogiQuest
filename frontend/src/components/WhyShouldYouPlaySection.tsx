const WhyShouldYouPlaySection = () => {
  return (
    <section className="bg-brand-primary-green w-full pt-[5%] md:pb-0 pb-16">
      <div className="flex flex-col md:flex-row w-[90%]  gap-8 justify-center  pt-8  mx-auto">
        <div className="md:w-[845px] w-[450px]  top-[236px] md:left-[-211px] h-">
          <img src="/whychoseus.png" />

        </div>
        <div className="md:w-[875px] mx-auto  space-y-4 md:space-y-8 md:mr-20">
          <h1 className="font-prompt font-[500] text-xl text-left">Why should you play?</h1>
          <ul className="text-left space-y-8 list-disc pl-5">
            <li className="text-md font-prompt font-[500]  " >Learn While You Play: <br></br>
              <span className="text-sm font-prompt font-[300] text-gray-300"> Enhance your knowledge in various subjects, from history to science and pop culture.
              </span>
            </li>
            <li className="text-md font-prompt font-[500] ">Compete with Friends: <br></br>
              <span className="text-sm font-prompt font-[300] text-gray-300 "> Invite friends to join you in Multiplayer mode and see who can achieve the highest score!</span>
            </li>
            <li className="text-md font-prompt font-[500] ">Flexible Play Options: <br></br>
              <span className="text-sm font-prompt text-gray-300"> Whether you want to practice at your own pace or compete against others, LogiQuest has a mode for you.</span>
            </li>

          </ul>
        </div>

      </div>
    </section>
  );
};

export default WhyShouldYouPlaySection;
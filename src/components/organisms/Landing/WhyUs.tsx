import { useEffect, useState } from "react";
import CarrousellButtons from "../../molecules/CarrousellButtons";

const vids = [
  {
    videoUrl: "src/assets/images/stock-chickens.mp4",
    text: "Bla bla bla del primero...",
  },
  {
    videoUrl: "src/assets/images/stock-chickens.mp4",
    text: "Más bla bla del segundo...",
  },
  {
    videoUrl: "src/assets/images/stock-chickens.mp4",
    text: "Y otro bla bla del tercero...",
  },
];

const WhyUs = () => {
  const [activeVid, setActiveVid] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveVid((prev) => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(intervalId);
  }, [activeVid]);

  return (
    <div className="relative w-dvw h-[60dvh] px-32 py-8 pb-16 flex flex-col justify-between bg-black overflow-hidden">
      <h2 className="text-white text-3xl font-bold relative z-10">¿Por qué elegirnos?</h2>

      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeVid * 100}%)` }}
      >
        {vids.map((item, i) => (
          <div key={i} className="relative w-full flex-shrink-0">
            <video className="w-full h-full object-cover brightness-50" src={item.videoUrl} autoPlay loop muted />

            <div className="absolute inset-0 flex items-end pb-16">
              <p className="text-white text-3xl font-bold ml-32">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
        <CarrousellButtons activeVid={activeVid} onClick={(index) => setActiveVid(index)} />
      </div>
    </div>
  );
};

export default WhyUs;

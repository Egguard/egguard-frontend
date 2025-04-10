import { useState } from "react";
import CarrousellButtons from "../../molecules/CarrousellButtons";

const vids = [
  {
    videoUrl: "https://www.youtube.com/watch?v=vWQpiMd-v0A",
    text: "Bla bla bla del primero...",
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=75uDqThKGQ4",
    text: "Más bla bla del segundo...",
  },
  {
    videoUrl: "https://www.youtube.com/watch?v=VTFnV14MOsk",
    text: "Y otro bla bla del tercero...",
  },
];

const WhyUs = () => {
  const [activeVid, setActiveVid] = useState(0);

  return (
    <div className="relative w-dvw h-6/10  px-32 py-8 pb-16 flex flex-col justify-between bg-black">
      <h2 className="text-white">¿Por qué elegirnos?</h2>

      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeVid * 100}%)` }}
      >
        {vids.map((item, i) => (
          <div key={i} className="w-full flex-shrink-0">
            <video
              className="w-full h-96 object-cover"
              src={item.videoUrl}
              autoPlay
              loop
              muted
            />
            <p className="text-white text-3xl font-bold ml-32 mb-16">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4">
        <CarrousellButtons
          activeVid={activeVid}
          onClick={(index) => setActiveVid(index)}
        />
      </div>
    </div>
  );
};

export default WhyUs;

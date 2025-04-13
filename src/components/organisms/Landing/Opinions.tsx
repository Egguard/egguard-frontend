import { useState, useEffect } from "react";
import OpinionsDisplay from "../../molecules/OpinionsDisplay";
import OpinionImages from "../../molecules/OpinionImages"; 

const Opinions = () => {
  const [activeOpinion, setActiveOpinion] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveOpinion((prev) => (prev + 1) % 3);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center gap-12 pt-16 pb-20 justify-center bg-gradient-to-b from-gray-light to-white">
      <OpinionsDisplay activeOpinion={activeOpinion} />
      <OpinionImages activeOpinion={activeOpinion} />
    </div>
  );
};

export default Opinions;

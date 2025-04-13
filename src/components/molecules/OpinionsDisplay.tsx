import opinionInterface from "../../lib/types/Opinion";  // Import the opinion interface

interface OpinionsDisplayProps {
  activeOpinion: number;
}

const OpinionsDisplay = ({ activeOpinion }: OpinionsDisplayProps) => {
  const opinions: opinionInterface[] = [
    {
      text: "Me gusta no hacer nada y con Egguard me lo puedo permitir. Es un grande el tío hace cosas mientras me tomo una cerveza.",
      name: "Eldo Mingo",
      location: "Tenerife"
    },
    {
      text: "Egguard es como tener un hijo que trabaja. Me levanto, le doy al botón, y me voy a dar un paseo por el monte. Todo hecho.",
      name: "Armando Broncas",
      location: "Valencia"
    },
    {
      text: "Este robot es un invento de los buenos. Yo me voy a echar un rato a la sombra y Egguard hace todo el curro del campo.",
      name: "Aylen Tejas",
      location: "Texas"
    },
  ];

  const currentOpinion = opinions[activeOpinion];

  return (
    <div className="w-5/10 h-70 shadow-xl bg-white rounded-2xl p-8 pb-6 flex flex-col justify-between">
      <div>
        <label className="opinion-label">la voz del campo</label>
        <p className="text-[24px] font-semibold w-[36ch]">“{currentOpinion.text}”</p>
      </div>

      <p className="text-xl font-medium flex flex-col gap-0">
        {currentOpinion.name}
        <p className="text-lg text-black/70">Granjero de {currentOpinion.location}</p>
      </p>
    </div>
  );
};

export default OpinionsDisplay;

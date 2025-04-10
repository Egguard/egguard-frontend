import Button from "../../atoms/Button";
import ScrollButton from "../../atoms/ScrollButton";

const Hero = () => {
  return (
    <div className="h-dvh w-dvw flex px-16 items-center">
      <div className="pl-16">
        <h1>Saluda a Egguard.</h1>
        <p className="text-3xl mb-4 mt-2">
          Tu aliado en la granja. <br /> Menos sorpresas, más control.
        </p>
        <Button>Compra el tuyo</Button>
      </div>
      <img className="size-fit" src="src/assets/images/LandingHero.png" />
      <div className="absolute bottom-8 w-full flex justify-center">
        <ScrollButton />
      </div>
    </div>
  );
};

export default Hero;

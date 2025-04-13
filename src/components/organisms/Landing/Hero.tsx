import { routes } from "../../../routes/routes";
import Button from "../../atoms/Button";
import ScrollButton from "../../atoms/ScrollButton";

const Hero = () => {
  return (
    <div className="h-dvh w-screen flex px-16 justify-center items-center overflow-clip">
      <div className="pl-16 min-w-fit">
        <h1>Saluda a Egguard.</h1>
        <p className="text-3xl mb-8 mt-2">
          Tu aliado en la granja. <br /> Menos sorpresas, más control.
        </p>
        <Button as="Link" to={routes.UNDER_CONSTRUCTION}>Compra el tuyo</Button>
      </div>
      <img className="size-auto max-w-1/2" src="src/assets/images/LandingHero.png" />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 justify-center">
        <ScrollButton />
      </div>
    </div>
  );
};

export default Hero;

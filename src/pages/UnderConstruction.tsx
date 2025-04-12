import Button from "../components/atoms/Button";

interface UnderConstructionInterface {
  noVolver?: boolean;
}

const UnderConstruction = ({noVolver}: UnderConstructionInterface) => {
  return(
    <div className="flex flex-col justify-center items-center size-full">
        <h2>Lo siento, aún estamos trabajando en esto...</h2>
        <img className="h-80 object-cover" src="https://i.pinimg.com/736x/ce/06/f6/ce06f6dc2e58ee0575b0abe7558773e8.jpg" alt="gatos trabajando" />
        {!noVolver && <Button className="w-96" as="button" onClick={() => window.history.back()}>Volver</Button>}
    </div>
  );
};

export default UnderConstruction;
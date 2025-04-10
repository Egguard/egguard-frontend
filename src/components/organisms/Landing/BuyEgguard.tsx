import Button from "../../atoms/Button";

const BuyEgguard = () => {
  return (
    <div className="w-dvw h-fit flex justify-center py-8 items-center gap-20">
      <img className="" src="src/assets/images/EgguardLanding.png" alt="Foto de nuestro productoEgguard"  />
      <div>
        <label>tu nuevo amigo</label>
        <h2 className="leading-10 mb-6">Egguard</h2>
        <p className="w-[46ch] mb-8">
          Mantén el control total de tu granja avícola con Egguard, el robot
          autónomo que trabaja por ti. Supervisa, protege y optimiza tu
          producción sin esfuerzo, permitiéndote ahorrar tiempo y mejorar el
          bienestar de tus animales.
        </p>
        <Button>Saber más</Button>
      </div>
    </div>
  );
};

export default BuyEgguard;
6
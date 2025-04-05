import BrandLogo from "../atoms/BrandLogo";
import Button from "../atoms/Button";

interface HeaderProps {
  user?: boolean;
}

const Header = (props: HeaderProps) => {
  return (
    <div className="bg-header backdrop-blur-lg px-6 h-20 w-9/10 absolute mt-6 rounded-2xl left-1/2 transform -translate-x-1/2 items-center inline-flex justify-between">
      <BrandLogo></BrandLogo>

      {props.user ? (
        <></>
      ) : (
        <div className="inline-flex gap-4">
          <Button to="" secondary>
            Iniciar sesión
          </Button>
          <Button to="">Comprar</Button>
        </div>
      )}
    </div>
  );
};

export default Header;

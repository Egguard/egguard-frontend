import { routes } from "../../routes/routes";
import BrandLogo from "../atoms/BrandLogo";
import Button from "../atoms/Button";

interface HeaderProps {
  user?: boolean;
}

const Header = (props: HeaderProps) => {
  return (
    <div className="fixed top-0 z-1000 bg-header backdrop-blur-md px-6 h-20 w-9/10 mt-6 rounded-2xl left-1/2 transform -translate-x-1/2 items-center inline-flex justify-between">
      <BrandLogo></BrandLogo>

      {props.user ? (
        <></>
      ) : (
        <div className="inline-flex gap-4">
          <Button as="Link" to={routes.USER} secondary>
            Iniciar sesión
          </Button>
          <Button as="Link" to={routes.UNDER_CONSTRUCTION}>Comprar</Button>
        </div>
      )}
    </div>
  );
};

export default Header;

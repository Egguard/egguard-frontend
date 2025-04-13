import { Link } from "react-router-dom";
import Input from "../atoms/Input";
import { routes } from "../../routes/routes";
import Button from "../atoms/Button";

const LoginForm = () => {
  return (
    <form className="w-1/2 flex flex-col gap-6">
      <h3 className="text-2xl font-extrabold text-center">Inicio de sesión</h3>

      <Input type="e-mail">E-mail</Input>
      <div>
        <Input type="password" className="mb-1">
          Contraseña
        </Input>

        <Link
          style={{ fontSize: "16px", fontWeight: 600 }}
          to={routes.RESET_PASS}
          className="text-base text-primary"
        >
          Olvidé mi contraseña
        </Link>
      </div>

      <div className="flex flex-col gap-6 items-center">
        <Button className="min-w-full text-center" as="Link" to={routes.USER}>
          Iniciar sesión
        </Button>

        <span className="text-base text-black/50">
          ¿Eres nuevo?{" "}
          <Link
            style={{ fontSize: "16px", fontWeight: 600 }}
            className="text-primary"
            to={routes.UNDER_CONSTRUCTION}
          >
            Compra tu Egguard
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;

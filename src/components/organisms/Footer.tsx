import { Link } from "react-router-dom";
import BrandLogo from "../atoms/BrandLogo";
import { routes } from "../../routes/routes";

const Footer = () => {
  return (
    <div
      className="bg-center bg-cover px-24 pt-8 pb-20 flex flex-col gap-y-6"
      style={{ backgroundImage: "url('src/assets/images/Footer.png')" }}
    >
      <BrandLogo />
      <Link to={routes.UNDER_CONSTRUCTION} className="footer-link mt-2">Legal <img className="size-fit" src="src/assets/icons/link-arrow.svg"></img></Link>
      <Link to={routes.UNDER_CONSTRUCTION} className="footer-link ">Contacto <img className="size-fit" src="src/assets/icons/link-arrow.svg"></img></Link>
      <Link to={routes.UNDER_CONSTRUCTION} className="footer-link ">Documentación <img className="size-fit" src="src/assets/icons/link-arrow.svg"></img></Link>
    </div>
  );
};

export default Footer;

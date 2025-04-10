import BrandLogo from "../atoms/BrandLogo";

const Footer = () => {
  return (
    <div
      className="bg-center bg-cover px-24 pt-8 pb-20 flex flex-col gap-y-6"
      style={{ backgroundImage: "url('src/assets/images/Footer.png')" }}
    >
      <BrandLogo />
      <a className="inline-flex gap-1 items-center mt-2">Legal <img className="size-fit" src="src/assets/icons/link-arrow.svg"></img></a>
      <a className="inline-flex gap-1 items-center ">Contacto <img className="size-fit" src="src/assets/icons/link-arrow.svg"></img></a>
      <a className="inline-flex gap-1 items-center ">Documentación <img className="size-fit" src="src/assets/icons/link-arrow.svg"></img></a>
    </div>
  );
};

export default Footer;

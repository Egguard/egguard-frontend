import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const BrandLogo = () => {
    return (
        <Link to={routes.LANDING} className="inline-flex gap-3.5 items-center">
            <img src="/Logo.svg" alt="Logo" className="w-[42px] h-[50px]"/>
            <h2 className="font-bold text-[32px] text-primary">Egguard</h2>

        </Link>
    )
} 

export default BrandLogo;
import { Link } from "react-router-dom";

interface ButtonProps {
  onClick?: () => void;
  to?: string;
  disabled?: boolean;
  as?: "button" | "submit" | "Link";
  children: React.ReactNode;
  secondary?: boolean;
}

const Button = (props: ButtonProps) => {
  if (props.as === "Link") {
    return (
      <Link className="" to={props.to || "/#"}>
        {props.children}
      </Link>
    );
  }
  return (
    <>
      <button
        className={`${props.secondary ? "bt-secondary" : "bt-primary"}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;

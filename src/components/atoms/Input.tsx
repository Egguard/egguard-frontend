import { useState } from "react";

interface InputInterface {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  type: string;
}

const Input = (props: InputInterface) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <input
        required
        type={props.type || "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${props.className} ${
          props.disabled ? "disabled:" : ""
        } input`}
      ></input>
      <label className="input-placeholder">{props.children}</label>
    </div>
  );
};
export default Input;

type VerticalDividerProps = {
  gray?: boolean;
};

const VerticalDivider = ({ gray }: VerticalDividerProps) => {
  return (
    <div className={`h-16 w-0.5 bg-black rounded-2xl ${gray ? "opacity-50" : ""}`}></div>
  );
};

export default VerticalDivider;
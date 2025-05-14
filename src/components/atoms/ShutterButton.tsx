import { captureCurrentFrame } from "../molecules/CameraFeed";

interface ShutterButtonProps {
  onCapture: (img: string) => void;
}

const ShutterButton = ({ onCapture }: ShutterButtonProps) => {
  const handleClick = () => {
    const img = captureCurrentFrame();
    if (img) {
      onCapture(img);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="size-20 rounded-full bg-white outline-8 outline-white/40 
      hover:brightness-110 hover:cursor-pointer hover:scale-110 
      active:brightness-90 active:scale-95 ease-in-out transition-all duration-300"
    ></button>
  );
};

export default ShutterButton;

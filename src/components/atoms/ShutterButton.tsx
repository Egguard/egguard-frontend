const ShutterButton = () => {
  const handleClick = () => {
    console.log("Shutter button clicked");
  };

  return (
    <button
      onClick={handleClick}
      className="size-20 rounded-full bg-white outline-8 outline-white/40"
    ></button>
  );
};

export default ShutterButton;

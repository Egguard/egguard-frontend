interface GalleryButtonProps {
  onClick: () => void;
}

const GalleryButton = ({onClick}: GalleryButtonProps) => {
  const getLastPicture = () => {
    // example
    console.log("Fetching the last picture...");
    return null;
  };

  return (
    <div className="relative w-40 h-32 cursor-pointer" onClick={onClick}>
      <img
        src={getLastPicture() || "/default-img.jpg"}
        alt="Gallery button"
        className="w-full h-full border-4 border-white rounded-lg object-cover"
      />
      <div
        className="content-[''] absolute bg-black 
        w-full h-full -top-2 -left-2 rounded-lg -z-10 border-gray-100 border-4 opacity-70"
      />
    </div>
  );
};

export default GalleryButton;

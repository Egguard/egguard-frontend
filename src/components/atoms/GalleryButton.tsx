interface GalleryButtonProps {
  onClick: () => void;
  image: string | null;
}

const GalleryButton = ({ onClick, image }: GalleryButtonProps) => {
  return (
    <div
      className="relative w-40 h-32 hover:cursor-pointer 
    hover:brightness-105 active:scale-95 brightness-90
    transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="absolute bg-black w-full h-full -top-2 -left-2 rounded-lg z-0 border-gray-100 border-4 opacity-70" />
      <img
        src={image || "/default-img.jpg"}
        draggable='false'
        alt="Gallery button"
        className="w-full h-full border-4 absolute border-white rounded-lg object-cover z-20"
      />
    </div>
  );
};

export default GalleryButton;

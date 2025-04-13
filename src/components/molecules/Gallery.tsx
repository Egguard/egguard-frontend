import { useState } from "react";
import GalleryButton from "../atoms/GalleryButton";
import GalleryPopUp from "../atoms/GalleryPopUp";

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [popUp, setPopUp] = useState(false);
  const togglePopup = () => setPopUp(!popUp);

  return (
    <div className="size-full flex items-end">
      <GalleryButton onClick={togglePopup} image={images[0] || null} />
      {popUp && <GalleryPopUp togglePopup={togglePopup} images={images} />}
    </div>
  );
};

export default Gallery;

import { useState } from "react";
import GalleryButton from "../atoms/GalleryButton";
import GalleryPopUp from "../atoms/GalleryPopUp";
import { AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [popUp, setPopUp] = useState(false);
  const togglePopup = () => setPopUp(!popUp);

  return (
    <div className="size-full flex items-end">
      <GalleryButton onClick={togglePopup} image={images[0] || null} />
      <AnimatePresence>
        {popUp && <GalleryPopUp togglePopup={togglePopup} images={images} />}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

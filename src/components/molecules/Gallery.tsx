import { useState } from "react";
import GalleryButton from "../atoms/GalleryButton";
import GalleryPopUp from "../atoms/GalleryPopup";

const Gallery = () => {
    const[popUp, setPopUp] = useState<boolean>(false);

    const togglePopup = () => {
        setPopUp(!popUp);
    }

  return (
    <div className="size-full flex items-end">
      <GalleryButton onClick={togglePopup} />

      {popUp && <GalleryPopUp togglePopup={togglePopup} />}
    </div>
  );
};

export default Gallery;

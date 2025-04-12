import { useState } from "react";
import ShutterButton from "../atoms/ShutterButton";
import CameraFeed from "../molecules/CameraFeed";
import Gallery from "../molecules/Gallery";

const UserCamera = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleCapture = (img: string) => {
    setImages(prev => {
      const updated = [img, ...prev];
      return updated.slice(0, 9); // máx. 9 imágenes
    });
  };

  return (
    <div className="size-full bg-red-500 relative">
      <CameraFeed />

      <div className="inline-flex absolute size-full bottom-0 left-0 items-end justify-between p-6">
        <Gallery images={images} />
        <ShutterButton onCapture={handleCapture} />
      </div>
    </div>
  );
};

export default UserCamera;

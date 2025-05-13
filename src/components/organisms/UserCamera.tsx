import { useState } from "react";
import ShutterButton from "../atoms/ShutterButton";
import CameraFeed from "../molecules/CameraFeed";
import Gallery from "../molecules/Gallery";
import MapView from "./MapView";

const UserCamera = ({ dashboard }: { dashboard?: boolean }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleCapture = (img: string) => {
    setImages((prev) => {
      const updated = [img, ...prev];
      return updated.slice(0, 9); // máx. 9 imágenes
    });
  };

  return (
    <div className="size-full relative">
      {!dashboard && (
        <div className="absolute top-4 right-4 border-4 border-white w-2/8 h-3/10 rounded-2xl overflow-clip z-10">
          <MapView />
        </div>
      )}
      <CameraFeed />

      {!dashboard && (
        <div className="inline-flex absolute size-full bottom-0 left-0 items-end justify-between p-6">
          <Gallery images={images} />
          <ShutterButton onCapture={handleCapture} />
        </div>
      )}
    </div>
  );
};

export default UserCamera;

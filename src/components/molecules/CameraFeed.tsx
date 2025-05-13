import { useState } from "react";
import { LoadingState } from "../atoms/States";

const CameraFeed = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className="absolute top-0 left-0 size-full -z-10" id="divCamera">
      {!isImageLoaded && (
        <div className="flex items-center justify-center size-full bg-gray-200">
          <LoadingState />
        </div>
      )}
      <img
        className={`size-full object-cover ${isImageLoaded ? "" : "hidden"}`}
        id="cameraFeed"
        crossOrigin="anonymous"
        src="http://localhost:8080/stream?topic=/camera/image_raw"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export const captureCurrentFrame = (): string | null => {
  const img = document.getElementById("cameraFeed") as HTMLImageElement | null;
  if (!img) return null;

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0, img.width, img.height);
  return canvas.toDataURL("image/png");
};

export default CameraFeed;

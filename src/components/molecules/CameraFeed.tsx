import { useState } from "react";
import { ErrorState, LoadingState } from "../atoms/States";

const CameraFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <div className="absolute top-0 left-0 size-full -z-10" id="divCamera">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center size-full bg-gray-light">
          <LoadingState />
        </div>
      ) : (
        isError && (
            <div className="flex flex-col items-center justify-center size-full bg-gray-light">
            <ErrorState small error="No se pudo cargar la transmisión de la cámara" />
            </div>
        )
      )}
      {isError && (
        <div className="flex flex-col items-center justify-center size-full bg-gray-light text-white">
          <p>Error loading camera feed</p>
        </div>
      )}
      <img
        className={`size-full object-cover ${
          isLoading || isError ? "hidden" : ""
        }`}
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

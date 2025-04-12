const CameraFeed = () => {
  return (
    <div className="absolute top-0 left-0 size-full -z-10" id="divCamera">
      <img
      className="size-full object-cover"
        id="cameraFeed"
        crossOrigin="anonymous"
        src="http://localhost:8080/stream?topic=/camera/image_raw"
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

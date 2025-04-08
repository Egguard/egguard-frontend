import React, { useEffect } from "react";

const CameraFeed = () => {
  useEffect(() => {
    // Llamada a la función setCamera al montar el componente
    setCamera();
  }, []);

  const setCamera = () => {
    console.log("Setting up camera...");
    new MJPEGCANVAS.Viewer({
      divID: 'cameraFeed',
      host: 'localhost',
      width: 640,
      height: 480,
      // Topic
      topic: '/camera/image_raw', 
      // (Refresh rate)
      interval: 200,
    });
  };

  return (
    <div id="cameraFeed">
      {/* Aquí se mostrará la secuencia MJPEG */}
    </div>
  );
};

export default CameraFeed;

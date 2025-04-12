import React, { useEffect } from "react";

const CameraFeed = () => {
  function updateCameraFeed() {
    const img = document.getElementById("cameraFeed");
    const timestamp = new Date().getTime(); // Evita caché agregando un timestamp
    img.src = `http://0.0.0.0:8080/stream?topic=/camera/image_raw`;
    //img.src = `http://localhost:8080/stream?topic=/turtlebot3/camera/image_raw&console.log("Cactualizando: http://0.0.0.0:8080/stream?topic=/camera/image_raw)"`
  }

  return (
    <div id="divCamera">
        <img id="cameraFeed" src="http://localhost:8080/stream?topic=/turtlebot3/camera/image_">
        </div>
  );
};

export default CameraFeed;

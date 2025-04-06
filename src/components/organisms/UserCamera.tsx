import ShutterButton from "../atoms/ShutterButton";
import CameraFeed from "../molecules/CameraFeed";
import Gallery from "../molecules/Gallery";

const UserCamera = () => {
  return (
    <div className="size-full">
      {/* Camera div molecule */}
      <CameraFeed />

      <div className="inline-flex items-end justify-between p-6 h-full w-full">
        {/* Gallery molecule with atoms: gallery button and gallery popup */}
        <Gallery />

        {/* Shutter button atom */}
        <ShutterButton />
      </div>
    </div>
  );
};

export default UserCamera;

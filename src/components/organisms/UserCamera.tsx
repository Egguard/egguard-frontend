import ShutterButton from "../atoms/ShutterButton";
import CameraFeed from "../molecules/CameraFeed";
import Gallery from "../molecules/Gallery";

const UserCamera = () => {
  return (
    <div className="size-full bg-red-500 relative">
      {/* Camera div molecule */}
      <CameraFeed />

      <div className="inline-flex absolute bottom-0 left-0 items-end justify-between p-6 w-full">
        {/* Gallery molecule with atoms: gallery button and gallery popup */}
        <Gallery />

        {/* Shutter button atom */}
        <ShutterButton />
      </div>
    </div>
  );
};

export default UserCamera;

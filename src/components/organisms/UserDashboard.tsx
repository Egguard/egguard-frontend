import MapView from "./MapView";
import UserCamera from "./UserCamera";
import UserNotifications from "./UserNotifications";

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-2 gap-12 px-16 py-12 h-full">
      <div className="flex flex-col gap-6">
        <div className="rounded-lg overflow-hidden h-full">
          <UserCamera dashboard />
        </div>
        <div className="rounded-lg overflow-hidden h-full">
          <MapView />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <UserNotifications dashboard />

        <div className="h-3/10 bg-gray-light rounded-lg p-4">
          <h2 className="!text-3xl">Estadísticas</h2>
          <div className="inline-flex gap-6 mt-4">
            <div className="bg-white rounded-md inline-flex gap-3 py-2 px-3">
              <img
                className="size-5"
                src="src/assets/icons/egg.svg"
                alt="Huevos recogidos"
              />
              <div className="h-full w-[1px] bg-black" />
              <p>12</p>
            </div>
            <div className="bg-white rounded-md inline-flex gap-3 py-2 px-3">
              <img
                className="size-5"
                src="src/assets/icons/broken-egg.svg"
                alt="Huevos rotos"
              />
              <div className="h-full w-[1px] bg-black" />
              <p>2</p>
            </div>
            <div className="bg-white rounded-md inline-flex gap-3 py-2 px-3">
              <img
                className="size-5"
                src="src/assets/icons/distance.svg"
                alt="Distancia recorrida"
              />
              <div className="h-full w-[1px] bg-black" />
              <p>300 m</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import Views from "@/lib/types/SideBarViews";
import MapView from "./MapView";
import UserCamera from "./UserCamera";
import UserNotifications from "./UserNotifications";

const UserDashboard = ({
  setActiveView,
}: {
  setActiveView: (view: Views) => void;
}) => {
  return (
    <div className="flex-1 py-12 px-16 h-full">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Columna izquierda - Ambos rectángulos de igual altura */}
        <div className="grid grid-rows-2 gap-6 h-full">
          {/* Rectángulo 1 (izquierda-arriba) */}
          <div className="overflow-clip rounded-2xl">
            <UserCamera dashboard />
          </div>

          {/* Rectángulo 3 (izquierda-abajo) */}
          <div className="overflow-clip rounded-2xl">
            <MapView />
          </div>
        </div>

        {/* Columna derecha - El de arriba más alto, el de abajo altura automática */}
        <div className="grid grid-rows-[1fr_auto] gap-6">
          {/* Rectángulo 2 (derecha-arriba) - Ocupa todo el espacio disponible */}
          <UserNotifications setActiveView={setActiveView} dashboard />

          {/* Rectángulo 4 (derecha-abajo) - Solo altura para su contenido */}
          <div className="bg-gray-light rounded-2xl pt-3 pb-6 px-4">
            <h2 className="!text-3xl items-center gap-2">Estadísticas últimos 7 días</h2>
            <div className="inline-flex gap-6 mt-4 w-full ml-4">
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
    </div>
  );
};

export default UserDashboard;

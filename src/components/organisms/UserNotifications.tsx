import Notification from "../molecules/Notification";
import { useUserNotifications } from "../../lib/hooks/useUserNotifications";

const UserNotifications = () => {
  const { data, isLoading, isError } = useUserNotifications();

  return (
    <div className="w-8/10 mx-auto py-12">
      <div className="inline-flex justify-between w-full items-center">
        <h2 className="font-bold text-black/60">Notificaciones</h2>
        <div>Paginador</div>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="flex items-center justify-center flex-col mt-40">
            <p className="text-gray-400 text-2xl font-bold text-center">
              Cargando...
            </p>
            <img className="w-1/4" src="/loader.gif" />
          </div>
        )}
        {isError && (
          <p className="text-red-500 text-2xl font-bold text-center mt-40">Error al cargar las notificaciones.</p>
        )}
        {!isLoading &&
          !isError &&
          data?.map((n) => (
            <Notification
              key={n.id}
              severity={n.severity}
              message={n.message}
              img={n.photoUrl}
              date={n.timestamp}
            />
          ))}
      </div>
    </div>
  );
};

export default UserNotifications;

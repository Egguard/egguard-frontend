import Notification from "../molecules/Notification";
import { useUserNotifications } from "../../lib/hooks/useUserNotifications";
import { ErrorState, LoadingState } from "../atoms/States";

const UserNotifications = () => {
  const { data, isLoading, isError } = useUserNotifications();

  return (
    <div className="w-8/10 mx-auto py-12">
      <div className="inline-flex justify-between w-full items-center">
        <h2 className="font-bold text-black/60">Notificaciones</h2>
        <div>Paginador</div>
      </div>

      <div className="space-y-4 mt-4">
        {isLoading && <LoadingState />}

        {isError && <ErrorState />}

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

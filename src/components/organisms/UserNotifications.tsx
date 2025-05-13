import { useState } from "react";
import Notification from "../molecules/Notification";
import { useUserNotifications } from "../../lib/hooks/useUserNotifications";
import { ErrorState, LoadingState } from "../atoms/States";
import Paginator from "../atoms/Paginator";
import { Link } from "react-router-dom";
import { routes } from "@/routes/routes";
import Views from "@/lib/types/SideBarViews";

const UserNotifications = ({
  dashboard,
  setActiveView,
}: {
  setActiveView?: (view: Views) => void;
  dashboard?: boolean;
}) => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(dashboard ? 4 : 5);
  const { data, isLoading, isError } = useUserNotifications(page, pageSize);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && !data.last) {
      setPage(page + 1);
    }
  };

  return (
    <div
      className={
        dashboard
          ? "w-full bg-gray-light rounded-lg p-4 h-full overflow-clip relative"
          : "w-8/10 mx-auto py-12"
      }
    >
      <div className="inline-flex justify-between w-full items-center">
        <h2 className={dashboard ? "!text-3xl" : "font-bold text-black/60"}>
          Notificaciones
        </h2>

        {data && !dashboard && (
        <Paginator
            currentPage={data.number}
            totalPages={data.totalPages}
            isFirstPage={data.first}
            isLastPage={data.last}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        )}

        {dashboard && setActiveView && (
          <button
            className="bg-white border-2 border-black font-bold px-2 py-0.5 rounded-md 
          hover:bg-white/50 hover:brightness-110 hover:cursor-pointer active:scale-95 active:brightness-90"
            onClick={() => setActiveView && setActiveView(Views.notifications)}
          >
            Ver todas
          </button>
        )}
      </div>

      <div
        className={`h-8/10 flex flex-col gap-4 mt-4 ${
          dashboard && "!gap-2 !mt-2"
        }`}
      >
        {isLoading ? (
          <LoadingState />
        ) : (
          isError && <ErrorState error="Error cargando notificaciones." />
        )}

        {!isLoading && !isError && data?.content.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay notificaciones disponibles
          </div>
        )}

        {!isLoading &&
          !isError &&
          data?.content.map((notification) => (
            <Notification
              key={notification.id}
              severity={notification.severity}
              message={notification.message}
              img={notification.photoUrl}
              date={notification.timestamp}
              dashboard={dashboard}
            />
          ))}
      </div>
      {dashboard && (
        <div className="absolute w-full h-20 left-0 bottom-0 bg-linear-to-t from-gray-light from-40% to-transparent"></div>
      )}
    </div>
  );
};

export default UserNotifications;

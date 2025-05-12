import { useState } from "react";
import Notification from "../molecules/Notification";
import { useUserNotifications } from "../../lib/hooks/useUserNotifications";
import { ErrorState, LoadingState } from "../atoms/States";
import Paginator from "../atoms/Paginator";

const UserNotifications = () => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(5);
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
    <div className="w-8/10 mx-auto py-12">
      <div className="inline-flex justify-between w-full items-center">
        <h2 className="font-bold text-black/60">Notificaciones</h2>
        
        {data && (
          <Paginator
            currentPage={data.number}
            totalPages={data.totalPages}
            isFirstPage={data.first}
            isLastPage={data.last}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        )}
      </div>

      <div className="space-y-4 mt-4">
        {isLoading && <LoadingState />}
        {isError && <ErrorState />}
        
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
            />
          ))}
      </div>
    </div>
  );
};

export default UserNotifications;
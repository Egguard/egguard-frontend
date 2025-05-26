import Views from "@/lib/types/SideBarViews";
import MapView from "./MapView";
import UserCamera from "./UserCamera";
import UserNotifications from "./UserNotifications";
import UserStats from "./UserStats";

const UserDashboard = ({
  setActiveView,
}: {
  setActiveView: (view: Views) => void;
}) => {
  return (
    <div className="flex-1 py-12 px-16 h-full">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Left column */}
        <div className="grid grid-rows-2 gap-6 h-full">
          {/* Top-Left */}
          <div className="overflow-clip rounded-2xl">
            <UserCamera dashboard />
          </div>

          {/* Bottom-Left */}
          <div className="overflow-clip rounded-2xl">
            <MapView />
          </div>
        </div>

        {/* Right column */}
        <div className="grid grid-rows-[1fr_auto] gap-6">
          {/* Top-Right */}
          <UserNotifications setActiveView={setActiveView} dashboard />

          {/* Bottom-Right */}
          <UserStats />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

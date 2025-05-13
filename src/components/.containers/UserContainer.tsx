import { useState } from "react";
import UserSideBar from "../organisms/UserSideBar";
import Views from "../../lib/types/SideBarViews";
import UserManualControl from "../organisms/UserManualControl";
import UserCamera from "../organisms/UserCamera";
import UnderConstruction from "../../pages/UnderConstruction";
import UserNotifications from "../organisms/UserNotifications";
import UserDashboard from "../organisms/UserDashboard";

const UserContainer = () => {
  const [activeView, setActiveView] = useState(Views.dashboard);

  return (
    <div className="h-8/10 w-9/10 bg-red inline-flex rounded-2xl overflow-clip shadow-user-layout">
      <UserSideBar activeView={activeView} setActiveView={setActiveView} />


      {activeView === Views.dashboard && <UserDashboard />}
      {activeView === Views.camera && <UserCamera />}
      {activeView === Views.control && <UserManualControl />}
      {activeView === Views.stats && <UnderConstruction noVolver />}
      {activeView === Views.notifications && <UserNotifications />}
    </div>
  );
};

export default UserContainer;

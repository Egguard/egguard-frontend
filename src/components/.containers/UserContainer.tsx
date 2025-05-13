import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserSideBar from "../organisms/UserSideBar";
import Views from "../../lib/types/SideBarViews";
import UserManualControl from "../organisms/UserManualControl";
import UserCamera from "../organisms/UserCamera";
import UnderConstruction from "../../pages/UnderConstruction";
import UserNotifications from "../organisms/UserNotifications";
import UserDashboard from "../organisms/UserDashboard";

const viewOrder = [
  Views.dashboard,
  Views.camera,
  Views.control,
  Views.notifications,
];

const UserContainer = () => {
  const [activeView, setActiveView] = useState(Views.dashboard);
  const [prevView, setPrevView] = useState(Views.dashboard);
  const [direction, setDirection] = useState<[number, number]>([0, 0]);

  const handleChangeView = (newView: Views) => {
    setPrevView(activeView);
    setActiveView(newView);
  };

  useEffect(() => {
    const prevIndex = viewOrder.indexOf(prevView);
    const currIndex = viewOrder.indexOf(activeView);

    let dir: [number, number] = [0, 0];

    if (currIndex === 0) dir = [-50, -50];
    else if (prevIndex === 0) dir = [50, 50];
    else if (currIndex === viewOrder.length - 1) dir = [50, 50];
    else if (prevIndex === viewOrder.length - 1) dir = [-50, -50];
    else if (currIndex > prevIndex) dir = [50, -50];
    else dir = [-50, 50];

    setDirection(dir);
    console.log("prev:", prevIndex, "curr:", currIndex, "dir:", dir);
  }, [activeView, prevView]);

  const renderActiveView = () => {
    switch (activeView) {
      case Views.dashboard:
        return <UserDashboard setActiveView={handleChangeView} />;
      case Views.camera:
        return <UserCamera />;
      case Views.control:
        return <UserManualControl />;
      case Views.notifications:
        return <UserNotifications />;
      default:
        return null;
    }
  };

  return (
    <div className="h-8/10 w-9/10 inline-flex rounded-2xl overflow-clip shadow-user-layout">
      <UserSideBar activeView={activeView} setActiveView={handleChangeView} />

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ y: direction[0], opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction[1], opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserContainer;

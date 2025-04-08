import SideBarButton from "../atoms/SideBarButton";
import Views from "../../lib/types/SideBarViews";

// Lucide icons import
import {
  Bell,
  Camera,
  ChartBar,
  Joystick,
  LayoutDashboard,
} from "lucide-react";

interface UserSideBarProps {
  activeView: string;
  setActiveView: (view: Views) => void;
}

const UserSideBar = ({ activeView, setActiveView }: UserSideBarProps) => {
  const activeColor = "#FFFFFF";
  const inactiveColor = "#2C2C2C";

  return (
    <div className="h-full w-24 bg-white flex flex-col justify-center items-center ">
      <div className="w-fit h-fit flex flex-col gap-4 ">
        <SideBarButton
          onClick={() => setActiveView(Views.dashboard)}
          active={activeView === Views.dashboard}
        >
          <LayoutDashboard
            color={activeView === Views.dashboard ? activeColor : inactiveColor}
            size={36}
            className="transition-colors duration-300 ease-in"
          />
        </SideBarButton>

        <SideBarButton
          onClick={() => setActiveView(Views.camera)}
          active={activeView === Views.camera}
        >
          <Camera
            color={activeView === Views.camera ? activeColor : inactiveColor}
            size={36}
            className="transition-colors duration-300 ease-in"
          />
        </SideBarButton>

        <SideBarButton
          onClick={() => setActiveView(Views.control)}
          active={activeView === Views.control}
        >
          <Joystick
            color={activeView === Views.control ? activeColor : inactiveColor}
            size={36}
            className="transition-colors duration-300 ease-in"
          />
        </SideBarButton>

        <SideBarButton
          onClick={() => setActiveView(Views.stats)}
          active={activeView === Views.stats}
        >
          <ChartBar
            color={activeView === Views.stats ? activeColor : inactiveColor}
            size={36}
            className="transition-colors duration-300 ease-in"
          />
        </SideBarButton>

        <SideBarButton
          onClick={() => setActiveView(Views.notifications)}
          active={activeView === Views.notifications}
        >
          <Bell
            color={
              activeView === Views.notifications ? activeColor : inactiveColor
            }
            size={36}
            className="transition-colors duration-300 ease-in"
          />
        </SideBarButton>
      </div>
    </div>
  );
};
25;

export default UserSideBar;

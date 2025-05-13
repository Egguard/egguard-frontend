// File: src/components/views/MapView.tsx

import { useState, useEffect } from "react";
import Map from "../molecules/Map";
import { Egg } from "../../lib/types/Egg";
import { RobotPosition } from "../../lib/types/RobotPosition";
import { useRobotService } from "../../context/RobotServiceContext";
import { fetchEggsFromAPI } from "../../services/api";
import { LoadingState, ErrorState } from "@/components/atoms/States";

const ODOMETRY_TOPIC = "/odom";
const ODOMETRY_MESSAGE_TYPE = "nav_msgs/msg/Odometry";

const mockEggs: Egg[] = [
  {
    id: 1,
    farmId: 9007199254740991,
    coordX: 0.1,
    coordY: 0.1,
    broken: false,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z",
  },
  {
    id: 2,
    farmId: 9007199254740991,
    coordX: 2.3,
    coordY: 3.5,
    broken: true,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z",
  },
  {
    id: 3,
    farmId: 9007199254740991,
    coordX: -2.1,
    coordY: -4.2,
    broken: false,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z",
  },
  {
    id: 4,
    farmId: 9007199254740991,
    coordX: -3.5,
    coordY: 4.2,
    broken: true,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z",
  },
];

const MapView = () => {
  const [eggs, setEggs] = useState<Egg[]>(mockEggs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [robotPosition, setRobotPosition] = useState<RobotPosition | null>(
    null
  );
  const [isRosConnected, setIsRosConnected] = useState<boolean>(false);

  const robotService = useRobotService();
  const farmId = 1;

  useEffect(() => {
    let mounted = true;
    const connectToRos = async () => {
      try {
        await robotService.connect();
        robotService.createTopic(ODOMETRY_TOPIC, ODOMETRY_MESSAGE_TYPE);
        robotService.subscribe(ODOMETRY_TOPIC, (message) => {
          if (!mounted) return;
          const position = message.pose?.pose?.position;
          const orientation = message.pose?.pose?.orientation;
          if (position && orientation) {
            setRobotPosition({
              x: position.x,
              y: position.y,
              z: position.z,
              orientation_x: orientation.x,
              orientation_y: orientation.y,
              orientation_z: orientation.z,
              orientation_w: orientation.w,
            });
          }
        });
        setIsRosConnected(true);
      } catch (error) {
        console.error("Failed to connect to ROS:", error);
        setIsRosConnected(false);
      }
    };

    connectToRos();
    return () => {
      mounted = false;
      if (isRosConnected) {
        robotService.unsubscribe(ODOMETRY_TOPIC);
      }
    };
  }, [robotService]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchEggs = async () => {
      try {
        setIsLoading(true);
        setError("Holaa");
        const today = new Date().toISOString().split("T")[0];
        const data = await fetchEggsFromAPI(farmId, today, controller.signal);
        setEggs(data);
      } catch (error) {
        console.error("Error fetching egg data:", error);
        setError("Failed to fetch egg data. Please try again later.");
        setEggs(mockEggs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEggs();
    return () => controller.abort();
  }, [farmId]);

  const brokenEggs = eggs.filter((e) => e.broken && !e.picked);

  const [legend, setLegend] = useState(false);

  return (
    <div className="relative size-full rounded-2xl group">
      {/* loading and error div with map as blurred background */}
      <div className="size-full bg-gray-dark/70 backdrop-blur-md absolute items-center  rounded-2xl overflow-clip">
        {isLoading ? (
          <LoadingState whiteText />
        ) : (
          error && (
            <ErrorState
              small
              error={"No se han podido encontrar tus huevos."}
            />
          )
        )}
      </div>
      <img
        src={"src/assets/images/map.png"}
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {!isLoading && eggs && robotPosition && (
        <Map eggs={eggs} robotPosition={robotPosition} />
      )}

      {/* legend button */}
      {!legend && (
        <button
          className="hidden absolute bottom-4 left-4 p-2 bg-gray-light rounded-md group-hover:block 
      hover:cursor-pointer hover:brightness-110 active:scale-95 active:brightness-90"
          onClick={() => setLegend(true)}
        >
          <img
            className="size-8"
            src="src/assets/icons/legend.svg"
            alt="legend"
          />
        </button>
      )}

      {/* legend */}
      {legend && (
        <div className="absolute w-full bottom-0 bg-gray-light py-2 px-4 inline-flex gap-4 justify-end">
          <button
            className="absolute left-2 bottom-1 size-8
          hover:cursor-pointer hover:opacity-90 active:scale-95 active:opacity-100"
            onClick={() => setLegend(false)}
          >
            <img src="src/assets/icons/close.svg" className=" " />
          </button>
          <div className="inline-flex gap-1">
            <img
              src="src/assets/icons/egg.svg"
              alt="Normal Egg"
              className="size-5 object-contain"
            />
            <span>Huevo normal</span>
          </div>
          <div className="inline-flex gap-1">
            <img
              src="src/assets/icons/broken-egg.svg"
              alt="Broken Egg"
              className="size-5 object-contain"
            />
            <span>Huevo roto</span>
          </div>
          <div className="inline-flex gap-1">
            <img
              src="/Logo.svg"
              alt="Robot"
              className="size-5 object-contain"
            />
            <span>Posicion robot</span>
          </div>
          {robotPosition && (
            <div className="ml-auto text-xs text-gray-500">
              Robot at ({robotPosition.x.toFixed(2)},{" "}
              {robotPosition.y.toFixed(2)})
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapView;

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
    const fetchEggs = async () => {
      try {
        setIsLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const data = await fetchEggsFromAPI(farmId, today);
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
  }, [farmId]);

  const brokenEggs = eggs.filter((e) => e.broken && !e.picked);

  const [legend, setLegend] = useState(false);

  return (
    <div className="relative size-full rounded-2xl group select-none">
      {(isLoading || error) && (
        <>
          <div className="size-full bg-gray-dark/70 backdrop-blur-md absolute items-center rounded-2xl overflow-clip">
            {isLoading ? (
              <LoadingState whiteText />
            ) : (
              error && <ErrorState small error={error} />
            )}
          </div>
          <img
            src={"src/assets/images/map.png"}
            draggable='false'
            className="absolute inset-0 w-full h-full object-cover -z-10"
            alt="Map background"
          />
        </>
      )}

      {!isLoading && !error && <Map eggs={eggs} robotPosition={robotPosition} />}
    </div>
  );
};

export default MapView;

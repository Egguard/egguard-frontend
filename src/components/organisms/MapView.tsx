// File: src/components/views/MapView.tsx

import { useState, useEffect } from 'react';
import Map from '../molecules/Map';
import { Egg } from '../../lib/types/Egg';
import { RobotPosition } from '../../lib/types/RobotPosition';
import { useRobotService } from '../../context/RobotServiceContext';
import { fetchEggsFromAPI } from '../../services/api';

const ODOMETRY_TOPIC = '/odom';
const ODOMETRY_MESSAGE_TYPE = 'nav_msgs/msg/Odometry';

const mockEggs: Egg[] = [
  { id: 1, farmId: 9007199254740991, coordX: 0.1, coordY: 0.1, broken: false, picked: false, timestamp: "2025-05-12T13:46:19.293Z" },
  { id: 2, farmId: 9007199254740991, coordX: 2.3, coordY: 3.5, broken: true, picked: false, timestamp: "2025-05-12T13:46:19.293Z" },
  { id: 3, farmId: 9007199254740991, coordX: -2.1, coordY: -4.2, broken: false, picked: false, timestamp: "2025-05-12T13:46:19.293Z" },
  { id: 4, farmId: 9007199254740991, coordX: -3.5, coordY: 4.2, broken: true, picked: false, timestamp: "2025-05-12T13:46:19.293Z" }
];

const MapView = () => {
  const [eggs, setEggs] = useState<Egg[]>(mockEggs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [robotPosition, setRobotPosition] = useState<RobotPosition | null>(null);
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
              orientation_w: orientation.w
            });
          }
        });
        setIsRosConnected(true);
      } catch (error) {
        console.error('Failed to connect to ROS:', error);
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
    const fetchEggs = async () => {      try {
        setIsLoading(true);
        setError(null);
        const today = new Date().toISOString().split('T')[0];
        const data = await fetchEggsFromAPI(farmId, today, controller.signal);
        setEggs(data);
      } catch (error) {
        console.error('Error fetching egg data:', error);
        setError('Failed to fetch egg data. Please try again later.');
        setEggs(mockEggs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEggs();
    return () => controller.abort();
  }, [farmId]);

  const brokenEggs = eggs.filter(e => e.broken && !e.picked);

  return (
    <div className="w-full h-full p-4">
      <div className="mb-4">
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-primary rounded-full"></div>
            <p className="text-gray-600">Loading egg data...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-gray-600">
            Current egg locations: {eggs.length} eggs found ({brokenEggs.length} broken eggs to collect)
          </p>
        )}
      </div>

      <div className="h-[40vh] w-xl border rounded-lg overflow-hidden shadow-md">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="animate-spin mr-2 h-8 w-8 border-t-4 border-b-4 border-primary rounded-full"></div>
            <p className="text-lg font-semibold text-gray-500">Loading map...</p>
          </div>
        ) : (
          <Map eggs={eggs} robotPosition={robotPosition} />
        )}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center">
          <img src="src/assets/images/egg.png" alt="Normal Egg" className="w-5 h-5 object-contain mr-2" />
          <span>Normal Egg</span>
        </div>
        <div className="flex items-center">
          <img src="src/assets/images/brokenEgg.png" alt="Broken Egg" className="w-5 h-5 object-contain mr-2" />
          <span>Broken Egg</span>
        </div>
        <div className="flex items-center">
          <img src="/Logo.svg" alt="Robot" className="w-5 h-5 object-contain mr-2" />
          <span>Robot Position</span>
        </div>
        {robotPosition && (
          <div className="ml-auto text-xs text-gray-500">
            Robot at ({robotPosition.x.toFixed(2)}, {robotPosition.y.toFixed(2)})
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;

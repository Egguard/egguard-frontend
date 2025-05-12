/**
 * @file MapView.tsx
 * @description React component that displays a map with eggs and potentially a robot.
 * This component handles fetching egg data and displaying them on the map.
 * 
 * @author GitHub Copilot
 */

import { useState, useEffect } from 'react';
import Map from '../molecules/Map';
import { Egg } from '../../lib/types/Egg';

// Mock egg data to demonstrate the Map component
const mockEggs: Egg[] = [
  {
    id: 1,
    farmId: 9007199254740991,
    coordX: 0.1,
    coordY: 0.1,
    broken: false,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z"
  },
  {
    id: 2,
    farmId: 9007199254740991,
    coordX: 2.3,
    coordY: 3.5,
    broken: true,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z"
  },
  {
    id: 3,
    farmId: 9007199254740991,
    coordX: -2.1,
    coordY: -4.2,
    broken: false,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z"
  },
  {
    id: 4,
    farmId: 9007199254740991,
    coordX: -3.5,
    coordY: 5.8,
    broken: true,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z"
  }
];

const MapView = () => {
  // State to hold egg data
  const [eggs, setEggs] = useState<Egg[]>(mockEggs);
  
  // In a real implementation, this would fetch the egg data from an API endpoint
  useEffect(() => {
    // For now, we're using mock data
    // In a real application, this would be replaced with an API call:
    // 
    // const fetchEggs = async () => {
    //   try {
    //     const response = await fetch('your-api-endpoint');
    //     const data = await response.json();
    //     setEggs(data);
    //   } catch (error) {
    //     console.error('Error fetching egg data:', error);
    //   }
    // };
    // 
    // fetchEggs();
    
    // Optional: Set up interval to periodically refresh the egg data
    // const refreshInterval = setInterval(fetchEggs, 30000); // 30 seconds
    // return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="w-full h-full p-4">
      <div className="mb-4">
        <p className="text-gray-600">
          Current egg locations: {eggs.length} eggs found
          ({eggs.filter(e => e.broken && !e.picked).length} broken eggs to collect)
        </p>
      </div>
      
      {/* Map container with fixed height */}
      <div className="h-[40vh] w-xl border rounded-lg overflow-hidden shadow-md">
        <Map eggs={eggs} />
      </div>
      
      {/* Legend */}
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
          <div className="w-4 h-4 rounded-full bg-gray-300 border border-white mr-2"></div>
          <span>Collected Egg</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;

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
    coordY: 4.2,
    broken: true,
    picked: false,
    timestamp: "2025-05-12T13:46:19.293Z"
  }
];

const MapView = () => {
  // State to hold egg data
  const [eggs, setEggs] = useState<Egg[]>(mockEggs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const farmId = 1; // Hardcoded farm ID as requested
  
  // Fetch egg data from the API endpoint
//   useEffect(() => {
//     const fetchEggs = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
        
//         // Get today's date in YYYY-MM-DD format
//         const today = new Date().toISOString().split('T')[0];
        
//         // Build the URL with query parameters
//         const url = `http://localhost:8080/api/v1/farms/${farmId}/eggs?picked=false&date=${today}`;
        
//         const response = await fetch(url);
        
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
        
//         const data = await response.json();
//         setEggs(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching egg data:', error);
//         setError('Failed to fetch egg data. Please try again later.');
//         setIsLoading(false);
//       }
//     };
    
//     fetchEggs();
//   }, [farmId]);
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
            Current egg locations: {eggs.length} eggs found
            ({eggs.filter(e => e.broken && !e.picked).length} broken eggs to collect)
          </p>
        )}
      </div>
      
      {/* Map container with fixed height */}
      <div className="h-[40vh] w-xl border rounded-lg overflow-hidden shadow-md">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="animate-spin mr-2 h-8 w-8 border-t-4 border-b-4 border-primary rounded-full"></div>
            <p className="text-lg font-semibold text-gray-500">Loading map...</p>
          </div>
        ) : (
          <Map eggs={eggs} />
        )}
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
      </div>
    </div>
  );
};

export default MapView;

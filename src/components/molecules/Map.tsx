/**
 * @file Map.tsx
 * @description React component for displaying a map with positioned eggs and robot position.
 *              Displays a background map image and overlays egg indicators and robot position based on coordinates.
 * 
 * @author 
 */

import { Egg } from '../../lib/types/Egg';
import { RobotPosition } from '../../lib/types/RobotPosition';
import robotIconPath from '../../../public/Logo.svg';
import brokenEggIconPath from '../../assets/images/brokenEgg.png';
import eggIconPath from '../../assets/images/egg.png';
import mapPath from '../../assets/images/map.png';


// Map boundary coordinates for coordinate system transformation
interface MapBoundaries {
  upperLeft: { x: number, y: number };
  upperRight: { x: number, y: number };
  lowerLeft: { x: number, y: number };
  lowerRight: { x: number, y: number };
}

interface MapProps {
  /**
   * Array of eggs to display on the map
   */
  eggs?: Egg[];
  
  /**
   * Robot position to display on the map
   */
  robotPosition?: RobotPosition | null;
  
  /**
   * Optional CSS class name to apply to the map container
   */
  className?: string;

  /**
   * Optional path to the map image
   * @default "src/assets/images/map.png"
   */
  mapImagePath?: string;
}

/**
 * Map component that displays a background image and positions eggs and robot on it
 * based on their coordinates.
 */
const Map = ({ eggs = [], robotPosition, className = '', mapImagePath = mapPath }: MapProps) => {
  // Map boundaries in ROS coordinate system
  const mapBoundaries: MapBoundaries = {
    upperLeft: { x: 4.65, y: 7.12 },
    upperRight: { x: 4.26, y: -9.03 },
    lowerLeft: { x: -4.38, y: 7.46 },
    lowerRight: { x: -4.78, y: -8.77 }
  };

  // Calculate the robot's rotation angle from quaternion (yaw angle)
  const calculateYawAngle = (robotPos?: RobotPosition | null): number => {
    if (!robotPos) return 0;
    
    // Convert quaternion to Euler angles (just yaw/heading in this case)
    const { orientation_x, orientation_y, orientation_z, orientation_w } = robotPos;
    
    // Calculate yaw (rotation around z-axis) from quaternion
    // This is a simplified conversion that only extracts yaw
    const siny_cosp = 2 * (orientation_w * orientation_z + orientation_x * orientation_y);
    const cosy_cosp = 1 - 2 * (orientation_y * orientation_y + orientation_z * orientation_z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);
    
    // Convert to degrees
    return yaw * (180 / Math.PI);
  };

  /**
   * Transforms ROS map coordinates (x, y) to pixel coordinates (left, top)
   * for correct positioning on the image
   */
  const transformCoordinates = (coordX: number, coordY: number) => {
    // Calculate the relative position within the boundaries (0-1)
    const minX = Math.min(
      mapBoundaries.upperLeft.x,
      mapBoundaries.lowerLeft.x
    );
    
    const maxX = Math.max(
      mapBoundaries.upperRight.x,
      mapBoundaries.lowerRight.x
    );
    
    const minY = Math.min(
      mapBoundaries.lowerRight.y,
      mapBoundaries.upperRight.y
    );
    
    const maxY = Math.max(
      mapBoundaries.upperLeft.y,
      mapBoundaries.lowerLeft.y
    );

    // Calculate normalized positions (0-1)
    const normalizedX = (coordX - minX) / (maxX - minX);
    // Y is inverted in the screen coordinate system
    const normalizedY = 1 - (coordY - minY) / (maxY - minY);

    // Convert to percentages for CSS positioning
    return {
      left: `${normalizedX * 100}%`,
      top: `${normalizedY * 100}%`
    };
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Map background image */}
      <img 
        src={mapImagePath}
        alt="Farm Map"
        className="size-full object-cover -z-10"
      />
        {/* Egg indicators */}
      {eggs
        .filter(egg => !egg.picked) // Filter out picked eggs
        .map((egg) => {
        const { left, top } = transformCoordinates(egg.coordX, egg.coordY);
        
        return (
          <div
            key={egg.id}
            style={{
              position: 'absolute',
              left,
              top,
              transform: 'translate(-50%, -50%)'
            }}
            className="flex items-center justify-center"
          >
            <img
              src={egg.broken ? brokenEggIconPath : eggIconPath}
              alt={egg.broken ? 'Broken Egg' : 'Egg'}
              className="w-8 h-8 object-contain drop-shadow-md z-10"
              title={`Egg ID: ${egg.id}${egg.broken ? ' (Broken)' : ''}`}
            />
          </div>
        );
      })}
      {/* Robot position indicator */}
      {robotPosition && (() => {
        const robotCoords = transformCoordinates(robotPosition.x, robotPosition.y);
        const rotation = calculateYawAngle(robotPosition);

        return (
            <div
            style={{
                position: 'absolute',
                left: robotCoords.left,
                top: robotCoords.top,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                transition: 'left 0.5s, top 0.5s, transform 0.5s'
            }}
            className="flex items-center justify-center z-20"
            >
            <img
                src={robotIconPath}
                alt="Robot"
                className="w-12 h-12 object-contain filter drop-shadow-lg"
                title="Robot Position"
            />
            </div>
        );
        })()}
    </div>
  );
};

export default Map;
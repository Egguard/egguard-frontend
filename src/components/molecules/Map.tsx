/**
 * @file Map.tsx
 * @description React component for displaying a map with positioned eggs.
 *              Displays a background map image and overlays egg indicators based on coordinates.
 * 
 * @author GitHub Copilot
 */

import { Egg } from '../../lib/types/Egg';

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
 * Map component that displays a background image and positions eggs on it
 * based on their coordinates.
 */
const Map = ({ eggs = [], className = '', mapImagePath = 'src/assets/images/map.png' }: MapProps) => {
  // Map boundaries in ROS coordinate system
  const mapBoundaries: MapBoundaries = {
    upperLeft: { x: 4.65, y: 7.12 },
    upperRight: { x: 4.26, y: -9.03 },
    lowerLeft: { x: -4.38, y: 7.46 },
    lowerRight: { x: -4.78, y: -8.77 }
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
      {eggs.map((egg) => {
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
            <div 
              className={`w-6 h-6 rounded-full ${
                egg.picked ? 'bg-gray-300' : 
                egg.broken ? 'bg-red-500' : 'bg-yellow-300'
              } border-2 border-white shadow-lg z-10`}
              title={`Egg ID: ${egg.id}${egg.broken ? ' (Broken)' : ''}${egg.picked ? ' (Picked)' : ''}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Map;
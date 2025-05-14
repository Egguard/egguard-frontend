/**
 * @file RobotPosition.ts
 * @description Interface defining the robot position structure
 * extracted from ROS odometry messages.
 * 
 * @author GitHub Copilot
 */

export interface RobotPosition {
  /**
   * X coordinate of the robot in the map reference frame
   */
  x: number;
  
  /**
   * Y coordinate of the robot in the map reference frame
   */
  y: number;
  
  /**
   * Z coordinate of the robot (usually 0 for ground robots)
   */
  z: number;
  
  /**
   * Orientation quaternion (x component)
   */
  orientation_x: number;
  
  /**
   * Orientation quaternion (y component)
   */
  orientation_y: number;
  
  /**
   * Orientation quaternion (z component)
   */
  orientation_z: number;
  
  /**
   * Orientation quaternion (w component)
   */
  orientation_w: number;
}

/**
 * @file Egg.ts
 * @description Interface defining the structure of an egg entity detected by Egguard.
 */

export interface Egg {
  /**
   * Unique identifier for the egg.
   */
  id: number;
  
  /**
   * Identifier for the farm where the egg was detected.
   */
  farmId: number;
  
  /**
   * X-coordinate of the egg position in the map.
   */
  coordX: number;
  
  /**
   * Y-coordinate of the egg position in the map.
   */
  coordY: number;
  
  /**
   * Whether the egg is broken or not.
   */
  broken: boolean;
  
  /**
   * Whether the egg has been picked up or not.
   */
  picked: boolean;
  
  /**
   * Timestamp when the egg was detected.
   */
  timestamp: string;
}

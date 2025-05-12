/**
 * @file RosMessages.ts
 * @description Defines the enums and interfaces used for communication with ROSBridge.
 *              Contains mode settings, direction controls, and message structures for manual navigation.
 * @author Manuel Borregales
 */

/**
 * Enum representing the mode of the robot.
 * - Manual: Robot is controlled manually by the user.
 * - Autonomous: Robot operates autonomously.
 * - Emergency: Robot is in emergency mode.
 */
export enum Mode {
    Manual = 'manual',
    Autonomous = 'autonomous',
    Emergency = 'emergency',
}

/**
 * Enum representing possible directions for robot movement.
 * - Forward: Move in the forward direction.
 * - Right: Turn or move to the right.
 * - Left: Turn or move to the left.
 */
export enum Direction {
    Forward = 'forward',
    Right = 'right',
    Left = 'left',
}

/**
 * Interface for the manual navigation message sent to control the robot's movement.
 * Includes velocity, direction, and a flag to stop movement.
 */
export interface ManualNavMessage {
    velocity: number;  // The speed at which the robot should move.
    direction: Direction;  // The direction of movement.
    stop_now: boolean;  // Whether to stop the robot immediately.
}

/**
 * Interface for the mode message sent to control the robot's operating mode.
 * Defines the mode of the robot (e.g., Manual, Autonomous, Emergency).
 */
export interface ModeMessage {
    mode: Mode;  // The mode in which the robot is operating.
}

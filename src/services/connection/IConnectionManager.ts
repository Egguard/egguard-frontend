/**
 * @file IConnectionManager.ts
 * @description Interface defining the contract for managing ROS connections.
 *              Provides methods for connecting, disconnecting, and event handling.
 */
import ROSLIB from 'roslib';

export interface IConnectionManager {
  /**
   * Establishes a connection to the ROS server.
   * @returns A promise that resolves when connected or rejects on error.
   */
  connect(): Promise<void>;

  /**
   * Closes the connection to the ROS server.
   * @returns A promise that resolves when disconnected.
   */
  disconnect(): Promise<void>;

  /**
   * Registers an event listener for ROS connection events.
   * @param event - The event name to listen for ('connection', 'error', 'close').
   * @param callback - The function to call when the event occurs.
   */
  on(event: string, callback: (data?: any) => void): void;

  /**
   * Gets the underlying ROSLIB.Ros instance.
   * @returns The ROS connection instance.
   */
  getRosInstance(): ROSLIB.Ros;
}
/**
 * @file ConnectionManager.ts
 * @description Concrete implementation of IConnectionManager for ROS bridge connections.
 *              Handles connection lifecycle and event management.
 */
import ROSLIB from 'roslib';
import { IConnectionManager } from './IConnectionManager';

export class ConnectionManager implements IConnectionManager {
  private ros: ROSLIB.Ros;

  /**
   * Creates a new ConnectionManager instance.
   * @param url - The WebSocket URL of the ROS bridge server.
   */
  constructor(private url: string) {
    this.ros = new ROSLIB.Ros({ url: this.url });
    this.setupListeners();
  }

  /**
   * Sets up event listeners for the ROS connection.
   * @private
   */
  private setupListeners(): void {
    this.ros.on('connection', () => console.log('Connected to ROS'));
    this.ros.on('error', (error: any) => console.error('Connection error:', error));
    this.ros.on('close', () => console.log('ROS connection closed'));
  }

  /**
   * Connects to the ROS server.
   * @returns A promise that resolves on successful connection or rejects on error.
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ros.isConnected) {
        console.log("ROS is already connected.");
        resolve();
        return;
      }
      // If not connected, set up listeners for future events
      const connectionHandler = () => {
        cleanup(); 
        resolve();
      };
      const errorHandler = (err: any) => {
        cleanup(); 
        reject(err);
      };
      const cleanup = () => {
        this.ros.off('connection', connectionHandler);
        this.ros.off('error', errorHandler);
      };

      this.ros.on('connection', connectionHandler);
      this.ros.on('error', errorHandler);

      // Attempt connection (roslib handles the actual connection attempt implicitly 
      // when the Ros object is created or if it got disconnected)
      // If the Ros object constructor failed, the error handler should catch it.
      // If it's trying to reconnect, these listeners will catch the outcome.
    });
  }

  /**
   * Disconnects from the ROS server.
   * @returns A promise that resolves when the connection is closed.
   */
  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      this.ros.close();
      resolve();
    });
  }

  /**
   * Registers an event listener.
   * @param event - The event name to listen for.
   * @param callback - The function to call when the event occurs.
   */
  on(event: string, callback: (data?: any) => void): void {
    this.ros.on(event, callback);
  }

  /**
   * Gets the ROSLIB.Ros instance.
   * @returns The active ROS connection instance.
   */
  getRosInstance(): ROSLIB.Ros {
    return this.ros;
  }
}

/**
 * @file RobotService.ts
 * @description Singleton service for managing robot communication.
 *              Coordinates connection and topic management for ROS interactions.
 */
import { IRobotService } from './IRobotService';
import { ConnectionManager } from '../connection/ConnectionManager';
import { TopicManager } from '../topic/TopicManager';
import { IConnectionManager } from '../connection/IConnectionManager';

export class RobotService implements IRobotService {
  private static instance: RobotService;
  private connectionManager: IConnectionManager;
  private topicManager: TopicManager;

  /**
   * Private constructor for singleton pattern.
   * @param rosUrl - The WebSocket URL of the ROS bridge server.
   */
  private constructor(rosUrl: string) {
    this.connectionManager = new ConnectionManager(rosUrl);
    this.topicManager = new TopicManager(this.connectionManager);
  }

  /**
   * Gets the singleton instance of RobotService.
   * @param rosUrl - Optional URL for the ROS bridge (defaults to 'ws://localhost:9090').
   * @returns The singleton RobotService instance.
   */
  public static getInstance(rosUrl: string = 'ws://localhost:9090'): RobotService {
    if (!RobotService.instance) {
      RobotService.instance = new RobotService(rosUrl);
    }
    return RobotService.instance;
  }

  /**
   * Connects to the ROS server.
   * @returns A promise that resolves when connected.
   */
  connect(): Promise<void> {
    return this.connectionManager.connect();
  }

  /**
   * Disconnects from the ROS server.
   * @returns A promise that resolves when disconnected.
   */
  disconnect(): Promise<void> {
    return this.connectionManager.disconnect();
  }

  /**
   * Creates a new ROS topic.
   * @param topicName - The name of the topic to create.
   * @param messageType - The ROS message type for the topic.
   */
  createTopic(topicName: string, messageType: string): void {
    this.topicManager.createTopic(topicName, messageType);
  }

  /**
   * Publishes a message to a ROS topic.
   * @param topicName - The name of the topic to publish to.
   * @param message - The message object to publish.
   */
  publish(topicName: string, message: object): void {
    this.topicManager.publishMessage(topicName, message);
  }

  /**
   * Subscribes to a ROS topic.
   * @param topicName - The name of the topic to subscribe to.
   * @param callback - The callback function for incoming messages.
   */
  subscribe(topicName: string, callback: (message: any) => void): void {
    this.topicManager.subscribeTopic(topicName, callback);
  }

  /**
   * Unsubscribes from a ROS topic.
   * @param topicName - The name of the topic to unsubscribe from.
   */
  unsubscribe(topicName: string): void {
    this.topicManager.unsubscribeTopic(topicName);
  }
}
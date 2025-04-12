/**
 * @file IRobotService.ts
 * @description Interface defining the high-level robot service contract.
 *              Combines connection and topic management for robot control.
 */
export interface IRobotService {
  /**
   * Connects to the ROS server.
   * @returns A promise that resolves when connected.
   */
  connect(): Promise<void>;

  /**
   * Disconnects from the ROS server.
   * @returns A promise that resolves when disconnected.
   */
  disconnect(): Promise<void>;

  /**
   * Creates a new ROS topic.
   * @param topicName - The name of the topic to create.
   * @param messageType - The ROS message type for the topic.
   */
  createTopic(topicName: string, messageType: string): void;

  /**
   * Publishes a message to a ROS topic.
   * @param topicName - The name of the topic to publish to.
   * @param message - The message object to publish.
   */
  publish(topicName: string, message: object): void;

  /**
   * Subscribes to a ROS topic.
   * @param topicName - The name of the topic to subscribe to.
   * @param callback - The callback function for incoming messages.
   */
  subscribe(topicName: string, callback: (message: any) => void): void;

  /**
   * Unsubscribes from a ROS topic.
   * @param topicName - The name of the topic to unsubscribe from.
   */
  unsubscribe(topicName: string): void;
}
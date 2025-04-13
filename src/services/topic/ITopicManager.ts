/**
 * @file ITopicManager.ts
 * @description Interface defining the contract for managing ROS topics.
 *              Provides methods for topic creation, publishing, and subscription.
 */
import ROSLIB from 'roslib';

export interface ITopicManager {
  /**
   * Creates a new ROS topic.
   * @param topicName - The name of the topic to create.
   * @param messageType - The ROS message type for the topic.
   * @returns The created ROSLIB.Topic instance.
   */
  createTopic(topicName: string, messageType: string): ROSLIB.Topic;

  /**
   * Publishes a message to a ROS topic.
   * @param topicName - The name of the topic to publish to.
   * @param message - The message object to publish.
   */
  publishMessage(topicName: string, message: object): void;

  /**
   * Subscribes to a ROS topic.
   * @param topicName - The name of the topic to subscribe to.
   * @param callback - The callback function to handle incoming messages.
   */
  subscribeTopic(topicName: string, callback: (message: any) => void): void;

  /**
   * Unsubscribes from a ROS topic.
   * @param topicName - The name of the topic to unsubscribe from.
   */
  unsubscribeTopic(topicName: string): void;
}
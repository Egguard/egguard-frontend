/**
 * @file TopicManager.ts
 * @description Concrete implementation of ITopicManager for ROS topic management.
 *              Handles topic lifecycle, message publishing, and subscriptions.
 */
import ROSLIB from 'roslib';
import { ITopicManager } from './ITopicManager';
import { IConnectionManager } from '../connection/IConnectionManager';

export class TopicManager implements ITopicManager {
  private topics: Map<string, ROSLIB.Topic> = new Map();

  /**
   * Creates a new TopicManager instance.
   * @param connectionManager - The connection manager providing ROS access.
   */
  constructor(private connectionManager: IConnectionManager) {}

  /**
   * Creates and stores a new ROS topic if it doesn't exist.
   * @param topicName - The name of the topic to create.
   * @param messageType - The ROS message type for the topic.
   * @returns The existing or newly created topic.
   */
  createTopic(topicName: string, messageType: string): ROSLIB.Topic {
    if (!this.topics.has(topicName)) {
      const topic = new ROSLIB.Topic({
        ros: this.connectionManager.getRosInstance(),
        name: topicName,
        messageType,
      });
      this.topics.set(topicName, topic);
    }
    return this.topics.get(topicName)!;
  }

  /**
   * Publishes a message to the specified topic.
   * @param topicName - The name of the topic to publish to.
   * @param message - The message object to publish.
   * @throws Error if the topic doesn't exist.
   */
  publishMessage(topicName: string, message: object): void {
    const topic = this.topics.get(topicName);
    if (!topic) {
      console.error(`Topic ${topicName} not found. Please create it first.`);
      return;
    }
    topic.publish(new ROSLIB.Message(message));
  }

  /**
   * Subscribes to the specified topic.
   * @param topicName - The name of the topic to subscribe to.
   * @param callback - The callback function for incoming messages.
   * @throws Error if the topic doesn't exist.
   */
  subscribeTopic(topicName: string, callback: (message: any) => void): void {
    const topic = this.topics.get(topicName);
    if (!topic) {
      console.error(`Topic ${topicName} not found. Please create it first.`);
      return;
    }
    topic.subscribe(callback);
  }

  /**
   * Unsubscribes from the specified topic.
   * @param topicName - The name of the topic to unsubscribe from.
   * @throws Error if the topic doesn't exist.
   */
  unsubscribeTopic(topicName: string): void {
    const topic = this.topics.get(topicName);
    if (!topic) {
      console.error(`Topic ${topicName} not found.`);
      return;
    }
    topic.unsubscribe();
  }
}
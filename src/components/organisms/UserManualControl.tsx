/**
 * @file UserManualControl.tsx
 * @description React component for manually controlling a robot via a UI with speed control and directional buttons.
 *              Connects to a ROSBridge server to send navigation commands in manual mode.
 *
 * @author Manuel Borregales - ROS integration
 * @author Mario Luis Mesa - UI and design
 */

import React,{ useState, useEffect, useRef } from 'react';
import * as ROSLIB from 'roslib';
import { Direction, Mode, ManualNavMessage, ModeMessage } from '../../types/RosMessages'; 

const ROSBRIDGE_URL = 'ws://localhost:9090';
const MODE_TOPIC = '/mode';
const MODE_MESSAGE_TYPE = 'egguard_custom_interfaces/msg/Mode';
const MANUAL_NAV_TOPIC = '/manual_nav';
const MANUAL_NAV_MESSAGE_TYPE = 'egguard_custom_interfaces/msg/ManualNav';
const ROS_VELOCITY_MAX = 100;  
const SLIDER_VELOCITY_MAX = 5;
const VELOCITY_SCALE_FACTOR = ROS_VELOCITY_MAX / SLIDER_VELOCITY_MAX;

/**
 * Establishes a connection to the ROSBridge server and attaches connection listeners.
 * @returns A ROSLIB.Ros instance.
 */
const createRosConnection = (): ROSLIB.Ros => {
  const ros = new ROSLIB.Ros({
    url: ROSBRIDGE_URL,
  });
  ros.on('connection', () => console.log('Connected to ROSBridge at', ROSBRIDGE_URL));
  ros.on('error', (error: any) => console.error('ROS Connection Error:', error));
  ros.on('close', () => console.log('ROS Connection Closed'));
  return ros;
};

/**
 * Creates a new ROS topic with the specified name and message type.
 * @param ros - The ROS connection instance.
 * @param name - The name of the topic.
 * @param messageType - The ROS message type for the topic.
 * @returns A ROSLIB.Topic instance.
 */
const createTopic = (ros: ROSLIB.Ros, name: string, messageType: string): ROSLIB.Topic => {
  return new ROSLIB.Topic({
    ros,
    name,
    messageType,
  });
};

/**
 * Publishes a message to the given ROS topic.
 * @param topic - The ROS topic to publish to.
 * @param message - The message object to publish.
 */
const publishMessage = <T,>(topic: ROSLIB.Topic, message: T): void => {
  topic.publish(new ROSLIB.Message(message));
  console.log(`Published message to ${topic.name}:`, message);
};


const UserManualControl: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);
  
  // TODO: we could use ros state to render different UI
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  console.log('ros', ros);
  
  // using refs avoids re-creating topics on every render
  const modeTopicRef = useRef<ROSLIB.Topic | null>(null);
  const navTopicRef = useRef<ROSLIB.Topic | null>(null);
  // Ref to record the time when a turn button is pressed
  const turnPressStartRef = useRef<number | null>(null);

  useEffect(() => {
    // First thing to run only once when the page is initialized
    const rosInstance = createRosConnection();
    setRos(rosInstance);

    rosInstance.on('connection', () => {
      modeTopicRef.current = createTopic(rosInstance, MODE_TOPIC, MODE_MESSAGE_TYPE);
      navTopicRef.current = createTopic(rosInstance, MANUAL_NAV_TOPIC, MANUAL_NAV_MESSAGE_TYPE);

      publishModeManual();
      publishManualNav(sliderValue * VELOCITY_SCALE_FACTOR, Direction.Forward);
    });

    return () => {
      rosInstance.close();
    };
  }, []);
  

  /**
   * Publishes a message to set the robot into manual mode.
   */
  const publishModeManual = () => {
    if (!modeTopicRef.current) return;
    const modeMsg: ModeMessage = { mode: Mode.Manual };
    publishMessage(modeTopicRef.current, modeMsg);
  };

  /**
   * Publishes a manual navigation command to the ROS topic.
   * @param speed - The velocity value to send.
   * @param direction - The direction enum value.
   */
  const publishManualNav = (speed: number, direction: Direction) => {
    if (!navTopicRef.current) {
      console.warn('ROS not connected, cannot publish navigation command.');
      return;
    }
    const navMsg: ManualNavMessage = {
      velocity: speed,
      direction,
      stop_now: false,
    };
    publishMessage(navTopicRef.current, navMsg);
  };

  /**
   * Handles changes in the speed slider and sends a forward movement command.
   * @param e - The slider change event.
   */
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);

    publishManualNav(newValue * VELOCITY_SCALE_FACTOR, Direction.Forward);
  };

  /**
   * Handles pressing down on a turn button. Sends the turn command and records the start time.
   * @param direction - The direction to turn (Left or Right).
   */
  const handleTurnMouseDown = (direction: Direction): void => {
    turnPressStartRef.current = Date.now();
    publishManualNav(sliderValue * VELOCITY_SCALE_FACTOR, direction);
  };

  /**
   * Handles releasing a turn button. Sends a forward command after a delay
   * proportional to how long the button was pressed.
   */
  const handleTurnMouseUp = (): void => {
    if (turnPressStartRef.current) {
      const pressDuration = Date.now() - turnPressStartRef.current;
      turnPressStartRef.current = null;
      setTimeout(() => {
        publishManualNav(sliderValue * VELOCITY_SCALE_FACTOR, Direction.Forward);
      }, pressDuration);
    }
  };
  
  return (
    <div className="w-9/10 h-8/10 m-auto mt-28 bg-red-500">
      {/* driving buttons container */}
      <div className="h-full w-full p-6 pr-8 inline-flex items-end justify-between">
        {/* turning buttons */}
        <div className="inline-flex gap-4 ">
          <button className="size-24 p-5 rounded-2xl bg-white/50 backdrop-blur-lg"
            onMouseDown={() => handleTurnMouseDown(Direction.Left)}
            onMouseUp={handleTurnMouseUp}
          >
            <img
              className="size-full"
              src="src/assets/icons/curved-arrow.png"
              alt= "left arrow"
            />
          </button>
          <button className="size-24 p-5 rounded-2xl bg-white/50 backdrop-blur-lg"
            onMouseDown={() => handleTurnMouseDown(Direction.Right)}
            onMouseUp={handleTurnMouseUp}
          >
            <img
              className="size-full transform -scale-x-100"
              src="src/assets/icons/curved-arrow.png"
              alt= "right arrow"
            />
          </button>
        </div>

        {/* speed slider  */}
        <div className="">
          <div className="flex flex-col items-center">
            <input
              type="range"
              min="0"
              max= {SLIDER_VELOCITY_MAX}
              value = {sliderValue}
              onChange = {handleSliderChange}
              style={{ writingMode: "vertical-rl" }}
              className="speed-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManualControl;

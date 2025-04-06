import React,{ useState, useEffect, useRef } from 'react';
import * as ROSLIB from 'roslib';
import { Direction, Mode, ManualNavMessage, ModeMessage } from '../../types/RosMessages'; 

const ROSBRIDGE_URL = 'ws://localhost:9090';
const MODE_TOPIC = '/mode';
const MODE_MESSAGE_TYPE = 'egguard_custom_interfaces/msg/Mode';
const MANUAL_NAV_TOPIC = '/manual_nav';
const MANUAL_NAV_MESSAGE_TYPE = 'egguard_custom_interfaces/msg/ManualNav';

const createRosConnection = (): ROSLIB.Ros => {
  const ros = new ROSLIB.Ros({
    url: ROSBRIDGE_URL,
  });
  ros.on('connection', () => console.log('Connected to ROSBridge at', ROSBRIDGE_URL));
  ros.on('error', (error: any) => console.error('ROS Connection Error:', error));
  ros.on('close', () => console.log('ROS Connection Closed'));
  return ros;
};

const createTopic = (ros: ROSLIB.Ros, name: string, messageType: string): ROSLIB.Topic => {
  return new ROSLIB.Topic({
    ros,
    name,
    messageType,
  });
};

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

  useEffect(() => {
    // First thing to run only once when the page is initialized
    const rosInstance = createRosConnection();
    setRos(rosInstance);

    rosInstance.on('connection', () => {
      modeTopicRef.current = createTopic(rosInstance, MODE_TOPIC, MODE_MESSAGE_TYPE);
      navTopicRef.current = createTopic(rosInstance, MANUAL_NAV_TOPIC, MANUAL_NAV_MESSAGE_TYPE);

      publishModeManual();
      publishManualNav(sliderValue * 20, Direction.Forward);
    });

    return () => {
      rosInstance.close();
    };
  }, []);
  
  const publishModeManual = () => {
    if (!modeTopicRef.current) return;
    const modeMsg: ModeMessage = { mode: Mode.Manual };
    publishMessage(modeTopicRef.current, modeMsg);
  };

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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);

    publishManualNav(newValue * 20, Direction.Forward);
  };
  
  return (
    <div className="w-9/10 h-8/10 m-auto mt-28 bg-red-500">
      {/* driving buttons container */}
      <div className="h-full w-full p-6 pr-8 inline-flex items-end justify-between">
        {/* turning buttons */}
        <div className="inline-flex gap-4 ">
          <button className="size-24 p-5 rounded-2xl bg-white/50 backdrop-blur-lg">
            <img
              className="size-full"
              src="src/assets/icons/curved-arrow.png"
              alt= "left arrow"
            />
          </button>
          <button className="size-24 p-5 rounded-2xl bg-white/50 backdrop-blur-lg">
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
              max="5"
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

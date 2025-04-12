/**
 * @file UserManualControl.tsx
 * @description React component for manually controlling a robot via a UI with speed control and directional buttons.
 *              Connects to a ROSBridge server to send navigation commands in manual mode.
 *
 * @author Manuel Borregales - ROS integration
 * @author Mario Luis Mesa - UI and design
 */

import React,{ useState, useEffect, useRef } from 'react';
import { useRobotService } from '../../context/RobotServiceContext';
import { Direction, Mode, ManualNavMessage, ModeMessage } from '../../types/RosMessages'; 
import CameraFeed from '../molecules/CameraFeed';

const MODE_TOPIC = '/mode';
const MODE_MESSAGE_TYPE = 'egguard_custom_interfaces/msg/Mode';
const MANUAL_NAV_TOPIC = '/manual_nav';
const MANUAL_NAV_MESSAGE_TYPE = 'egguard_custom_interfaces/msg/ManualNav';

const ROS_VELOCITY_MAX = 100;  
const SLIDER_VELOCITY_MAX = 5;
const VELOCITY_SCALE_FACTOR = ROS_VELOCITY_MAX / SLIDER_VELOCITY_MAX;

const UserManualControl: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isRosReady, setIsRosReady] = useState(false);
  
  const robotService = useRobotService();
  // Ref to record the time when a turn button is pressed
  const turnPressStartRef = useRef<number | null>(null);

  useEffect(() => {
    setIsRosReady(false);
    robotService.connect().then(() => {
      // Create topics once connected.
      robotService.createTopic(MODE_TOPIC, MODE_MESSAGE_TYPE);
      robotService.createTopic(MANUAL_NAV_TOPIC, MANUAL_NAV_MESSAGE_TYPE);

      setIsRosReady(true);
      publishManualNav(sliderValue * VELOCITY_SCALE_FACTOR, Direction.Forward);
    }).catch((error: any) => {
      console.error('Failed to connect or setup topics:', error);
      setIsRosReady(false);
    });

    // Keep the connection open when the component unmounts
  }, [robotService]);
  

  /**
   * Publishes a message to set the robot into manual mode.
   */
  const publishModeManual = () => {
    const modeMsg: ModeMessage = { mode: Mode.Manual };
    robotService.publish(MODE_TOPIC, modeMsg);
  };

  /**
   * Publishes a manual navigation command to the ROS topic.
   * @param speed - The velocity value to send.
   * @param direction - The direction enum value.
   */
  const publishManualNav = (speed: number, direction: Direction) => {
    const navMsg: ManualNavMessage = {
      velocity: speed,
      direction,
      stop_now: false,
    };
    robotService.publish(MANUAL_NAV_TOPIC, navMsg);
  };

  /**
   * Handles changes in the speed slider and sends a forward movement command.
   * @param e - The slider change event.
   */
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const invertedValue = SLIDER_VELOCITY_MAX - Number(e.target.value);
    setSliderValue(invertedValue);
    if (isRosReady) {
        publishManualNav(invertedValue * VELOCITY_SCALE_FACTOR, Direction.Forward);
    }
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
      turnPressStartRef.current = null;
      publishManualNav(sliderValue * VELOCITY_SCALE_FACTOR, Direction.Forward);
    }
  };
  
  return (
    <div className="size-full relative">
      <CameraFeed />

      {/* driving buttons container */}
      <div className="h-full w-full p-6 pr-8 inline-flex items-end justify-between z-10">
        {/* turning buttons */}
        <div className="inline-flex gap-4 ">
          <button className="size-24 p-5 rounded-2xl bg-white/50 backdrop-blur-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onMouseDown={() => handleTurnMouseDown(Direction.Left)}
            onMouseUp={handleTurnMouseUp}
            disabled={!isRosReady}
          >
            <img
              className="size-full"
              src="src/assets/icons/curved-arrow.png"
              alt= "left arrow"
            />
          </button>
          <button className="size-24 p-5 rounded-2xl bg-white/50 backdrop-blur-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onMouseDown={() => handleTurnMouseDown(Direction.Right)}
            onMouseUp={handleTurnMouseUp}
            disabled={!isRosReady}
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
                max={SLIDER_VELOCITY_MAX}
                value={SLIDER_VELOCITY_MAX - sliderValue}
                onChange={handleSliderChange} 
                disabled={!isRosReady}
                style={{ writingMode: "vertical-lr" }}
                className="speed-slider disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserManualControl;

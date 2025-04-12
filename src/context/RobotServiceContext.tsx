/**
 * @file RobotServiceContext.tsx
 * @description React context provider for the RobotService singleton.
 *              Provides access to the robot service throughout the React component tree.
 * 
* @author Manuel Borregales & Juan Diaz
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { RobotService } from '../services/robot/RobotService';

/**
 * The React context that will hold the RobotService instance.
 * Initialized as null and will be populated by the RobotServiceProvider.
 */
const RobotServiceContext = createContext<RobotService | null>(null);

/**
 * Props interface for the RobotServiceProvider component.
 */
interface RobotServiceProviderProps {
  /**
   * The WebSocket URL for the ROS bridge connection.
   * @default 'ws://localhost:9090'
   */
  rosUrl?: string;
  
  /**
   * The child components that will have access to the RobotService context.
   */
  children: ReactNode;
}

/**
 * Provider component that makes the RobotService instance available to all child components.
 * 
 * @param props - The component props containing optional rosUrl and children.
 * @returns A React context provider wrapping the children.
 * 
 * @example
 * <RobotServiceProvider rosUrl="ws://my-ros-bridge:9090">
 *   <App />
 * </RobotServiceProvider>
 */
export const RobotServiceProvider: React.FC<RobotServiceProviderProps> = ({
  rosUrl = 'ws://localhost:9090',
  children,
}) => {
  const robotService = RobotService.getInstance(rosUrl);

  return (
    <RobotServiceContext.Provider value={robotService}>
      {children}
    </RobotServiceContext.Provider>
  );
};

/**
 * Custom hook for accessing the RobotService instance from any component.
 * 
 * @returns The RobotService instance.
 * @throws Error if used outside of a RobotServiceProvider.
 * 
 * @example
 * const robotService = useRobotService();
 * robotService.connect().then(() => { ... });
 */
export const useRobotService = (): RobotService => {
  const context = useContext(RobotServiceContext);
  if (!context) {
    throw new Error('useRobotService must be used within a RobotServiceProvider');
  }
  return context;
};
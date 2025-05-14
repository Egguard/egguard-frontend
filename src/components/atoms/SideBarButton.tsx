import { motion } from "framer-motion";

interface SideBarButtonInterface {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const SideBarButton = (props: SideBarButtonInterface) => {
  return (
    <motion.button
    
      onClick={props.onClick}
      className={`bg-amber- size-15 rounded-2xl flex justify-center items-center ${
        props.active ? `bg-primary` : `bg-none hover:ml-2 hover:bg-primary/10 hover: cursor-pointer hover:scale-110`
      } 
       active:scale-95 active:brightness-90 transition-all duration-300 ease-in`}
    >
      {props.children}
    </motion.button>
  );
};

export default SideBarButton;

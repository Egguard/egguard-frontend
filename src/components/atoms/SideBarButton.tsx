interface SideBarButtonInterface {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const SideBarButton = (props: SideBarButtonInterface) => {
  return (
    <button
      onClick={props.onClick}
      className={`bg-amber- size-15 rounded-2xl flex justify-center items-center ${
        props.active ? `bg-primary` : `bg-none`
      } transition-colors duration-300 ease-in`}
    >
      {props.children}
    </button>
  );
};

export default SideBarButton;

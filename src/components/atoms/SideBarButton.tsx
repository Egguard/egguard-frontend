interface SideBarButtonInterface {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const SideBarButton = (props: SideBarButtonInterface) => {
  return (
    <button
      onClick={props.onClick}
      className={`"size-15 rounded-2xl flex justify-center align-middle"${
        props.active ? `bg-primary` : `bg-none`
      }`}
    >
      {props.children}
    </button>
  );
};

export default SideBarButton;

const ScrollButton = () => {
  return (
    <button
      className={`relative border-primary border-4 items-center inline-flex justify-center px-4 h-14 w-32 hover:w-[200px] rounded-2xl
        group hover:bg-primary  text-white
        transition-all duration-300 ease-in-out`}
    >
      <p className="m-0 w-0 text-[20px] font-bold opacity-0 group-hover:opacity-100 group-hover:w-24
             transition-all duration-300 ease-in-out whitespace-nowrap">
        Saber más
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="currentColor"
        className="w-12 h-10 text-primary group-hover:text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25L12 15.75 4.5 8.25"
        />
      </svg>
    </button>
  );
};

export default ScrollButton;

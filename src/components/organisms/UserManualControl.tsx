{
  /* HOLA MANU ES AQUI MANU */
}

const UserManualControl = () => {
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
            />
          </button>
          <button className="size-24 p-5 rounded-2xl bg-white/50 backdrop-blur-lg">
            <img
              className="size-full transform -scale-x-100"
              src="src/assets/icons/curved-arrow.png"
            />
          </button>
        </div>

        {/* speed slider  */}
        <div className="">
          <div className="flex flex-col items-center">
             {/* MANU AQUI CAMBIA EL MAX A LO QUE CREAS 20 o asi diria yo, 
                luego eso se mapea en ros a lo que seria la velocidad del 
                robot no se como lo hiciste exactamente en ROS pero eso 
                habiamos dicho Juan y yo en su momento */}
            <input
              type="range"
              min="0"
              max="5"
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

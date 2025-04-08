interface GalleryPopUpProps {
  togglePopup: () => void;
}

const GalleryPopUp = ({ togglePopup }: GalleryPopUpProps) => {
  return (
    <div className="bg-black/40 size-full flex justify-center items-center absolute inset-0 z-100">
      <div className="bg-white size-3/4 rounded-2xl py-4 px-8">
        <div className="inline-flex justify-between align-middle w-full">
          <h3>Galería</h3>
          <button className="size-6 cursor-pointer" onClick={togglePopup}>
            <img src="src/assets/icons/close.svg" alt="Cerrar" />
          </button>
        </div>

        <div className="h-[2px] w-full bg-gray-normal my-4" />

        <div className="grid grid-cols-3 gap-4 px-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-28 bg-gray-light rounded-lg flex items-center justify-center"
            >
              <span>Image {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPopUp;

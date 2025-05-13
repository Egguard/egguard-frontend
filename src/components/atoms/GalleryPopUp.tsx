import { motion } from "framer-motion";

interface GalleryPopUpProps {
  togglePopup: () => void;
  images: string[];
}

const GalleryPopUp = ({ togglePopup, images }: GalleryPopUpProps) => {
  const handleDownload = (img: string, index: number) => {
    const a = document.createElement("a");
    a.href = img;
    a.download = `egguard_foto_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 size-full flex justify-center items-center absolute inset-0 z-100"
    >
      <div className="bg-white size-3/4 rounded-2xl py-4 px-8">
        <div className="inline-flex justify-between align-middle w-full">
          <h3>Galería</h3>
          <button className="size-6 cursor-pointer" onClick={togglePopup}>
            <img src="src/assets/icons/close.svg" alt="Cerrar" />
          </button>
        </div>

        <div className="h-[2px] w-full bg-gray-normal my-4" />

        <div className="grid grid-cols-3 gap-4 px-8">
          {Array.from({ length: 9 }).map((_, index) => {
            const img = images[index];
            return (
              <div
                key={index}
                className={`w-full h-28 bg-gray-light rounded-lg flex items-center justify-center overflow-hidden 
                ${
                  img &&
                  "hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out active:scale-95 active:brightness-90"
                }`}
                onClick={() => img && handleDownload(img, index)}
              >
                {img ? (
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover size-full "
                  />
                ) : (
                  <img
                    src="/default-img.jpg"
                    className="object-cover size-full"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryPopUp;

import { motion } from "framer-motion";

interface NotificationPopUpInterface {
  togglePopUp: () => void;
  title: string;
  date: string;
  imgUrl: string;
  severityUrl: string;
}

const NotificationPopUp = (props: NotificationPopUpInterface) => {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-black/40 size-full flex justify-center items-center absolute inset-0 z-100"
      >
        <div className="bg-white size-3/4 rounded-2xl py-4 px-8 space-y-4">
          <div className="inline-flex justify-between align-middle w-full gap-4">
            <div className="inline-flex gap-4">
              <img src={props.severityUrl} alt="Severity" />
              <div>
                <h3 className="text-2xl font-bold">{props.title}</h3>
                <p>{props.date}</p>
              </div>
            </div>
            <button
              className="size-6 cursor-pointer"
              onClick={() => props.togglePopUp()}
            >
              <img src="src/assets/icons/close.svg" alt="Cerrar" />
            </button>
          </div>

          <img
            src={props.imgUrl}
            className="h-8/10 mx-auto rounded-2xl object-contain w-fit"
            alt="Imagen notificacion"
          />
        </div>
      </motion.div>
  );
};
export default NotificationPopUp;

import { formatDate } from "@/lib/formatDate";
import { NotificationSeverity } from "@/lib/types/apiTypes";
import NotificationPopUp from "../atoms/NotificationPopUp";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

interface notificationInterface {
  severity: NotificationSeverity;
  message: string;
  date: string;
  img?: string;
  dashboard?: boolean;
}

const SeverityImgRoutes: Record<NotificationSeverity, string> = {
  [NotificationSeverity.CRITICAL]: "src/assets/icons/critical.svg",
  [NotificationSeverity.WARNING]: "src/assets/icons/info.svg",
  [NotificationSeverity.INFO]: "src/assets/icons/warning.svg",
};

const Notification = (props: notificationInterface) => {
  const [popUp, togglePopUp] = useState(false);

  return (
    <div
      className={`w-full rounded-2xl inline-flex bg-[#EFEFEF] py-3 px-4 max-h-20 ${
        props.img ? "justify-between" : ""
      }`}
    >
      <div className="inline-flex gap-6">
        <img
          className={props.dashboard ? "w-8" : "w-12"}
          src={SeverityImgRoutes[props.severity]}
          alt={props.severity}
        />
        <div className="flex flex-col">
          <p className={props.dashboard ? "text-xl " : "text-2xl font-bold"}>
            {props.dashboard && props.message.length > 40
              ? `${props.message.slice(0, 40)}...`
              : props.message}
          </p>
          <p
            className={
              props.dashboard
                ? "text-md text-gray-dark/80 leading-4"
                : "text-xl leading-4 text-black/70"
            }
          >
            {formatDate(props.date, "default")}
          </p>
        </div>
      </div>
      {!props.dashboard && props.img && (
        <>
          <img
            src={props.img}
            className=" w-24 bg-gray-dark/50 rounded-lg hover:cursor-pointer 
            hover:brightness-110 hover:scale-110 active:brigthness-90 active:scale-95 transition-all duration-300 ease-in-out"
            alt={"imagen adjunta"}
            onClick={() => togglePopUp(!popUp)}
          />
          <AnimatePresence>
            {popUp && (
              <NotificationPopUp
                togglePopUp={() => togglePopUp(!popUp)}
                title={props.message}
                imgUrl={props.img}
                date={formatDate(props.date, "default")}
                severityUrl={SeverityImgRoutes[props.severity]}
              />
            )}
          </AnimatePresence>
        </>
      )}
      {/* POPUP YET TO BE DONE */}
    </div>
  );
};
export default Notification;

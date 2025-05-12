import { formatDate } from "@/lib/formatDate";
import { NotificationSeverity } from "@/types/apiTypes";

interface notificationInterface {
  severity: NotificationSeverity;
  message: string;
  date: string;
  img?: string;
}

const SeverityImgRoutes: Record<NotificationSeverity, string> = {
  [NotificationSeverity.CRITICAL]: "src/assets/icons/critical.svg",
  [NotificationSeverity.WARNING]: "src/assets/icons/info.svg",
  [NotificationSeverity.INFO]: "src/assets/icons/warning.svg",
};

const Notification = (props: notificationInterface) => {
  return (
    <div
      className={`relative w-full rounded-2xl inline-flex bg-[#EFEFEF] py-3 px-4 ${
        props.img ? "justify-between" : ""
      }`}
    >
      <div className="inline-flex gap-6">
        <img className="w-12" src={SeverityImgRoutes[props.severity]} alt={props.severity} />
        <div className="flex flex-col">
          <p className="text-2xl font-bold">{props.message}</p>
          <p className="text-xl leading-4 text-black/70">
            {formatDate(props.date, "default")}
          </p>
        </div>
      </div>
      {props.img && (
        <img
          className="absolute h-8/10 right-2 top-2 w-24 bg-gray-dark/50 rounded-lg"
          alt={"imagen adjunta"}
        />
      )}
      {/* POPUP YET TO BE DONE */}
    </div>
  );
};
export default Notification;

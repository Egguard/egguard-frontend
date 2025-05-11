interface notificationInterface {
  severity: string; // this should be taken from types
  title: string;
  date: Date;
  img?: string;
}

const SeverityImgRoutes: Record<string, string> = {
  // should create a SEVERITY_TYPES and also use it on GET
  danger: "",
  alert: "",
  info: "",
};

const Notification = (props: notificationInterface) => {
  return (
    <div
      className={`w-full rounded-2xl inline-flex bg-[#EFEFEF] py-3 px-4 ${
        props.img ? "justify-between" : ""
      }`}
    >
      <div className="inline-flex gap-6">
        <img className="w-16 " src={SeverityImgRoutes[props.severity]} alt={props.severity} />
        <div className="flex flex-col">
          <p className="text-3xl font-bold">{props.title}</p>
          <p className="text-xl text-black/70">
            hh:mm - dd/mm/yyyy
            {/* props.date to format ' hh:mm - dd/mm/yyyy ' */}
          </p>
        </div>
      </div>
      {props.img && (
        <img
          className="w-24 bg-gray-dark/50 rounded-lg"
          alt={props.title + " img"}
        />
      )}
      {/* POPUP YET TO BE DONE */}
    </div>
  );
};
export default Notification;

import Notification from "../molecules/Notification";

const UserNotifications = () => {
  return (
    <div className="size-8/10 mx-auto self-center">
      <div className="inline-flex justify-between w-full items-center">
        <h2 className="font-bold text-black/60">Notificaciones</h2>
        <div>Paginador</div>
      </div>
      <Notification severity="danger" title="Hola" date={new Date} img="asd" />
    </div>
  );
};

export default UserNotifications;

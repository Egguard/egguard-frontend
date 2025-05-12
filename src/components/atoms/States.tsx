export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-40">
      <p className="text-gray-400 text-2xl font-bold text-center">
        Cargando...
      </p>
      <img className="w-1/4" src="/loader.gif" alt="imagen de carga" />
    </div>
  );
};

export const ErrorState = () => {
  return (
    <p className="text-red-500 text-2xl font-bold text-center mt-40">
      Error al cargar las notificaciones.
    </p>
  );
};

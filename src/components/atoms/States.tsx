export const LoadingState = ({
  blackText,
  whiteText,
}: {
  whiteText?: boolean;
  blackText?: boolean;
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <img className="w-1/4" src="/loader.gif" alt="imagen de carga" />
      <p
        className={`text-2xl font-bold text-center ${
          blackText ? "text-black" : whiteText ? "text-white" :"text-gray-400"
        }`}
      >
        Cargando...
      </p>
    </div>
  );
};

export const ErrorState = ({ error, small }: { small?: boolean, error: string }) => {
  return (
    <p className={`text-red-500 ${small ? "text-lg w-[20ch] mx-auto" : "text-2xl"} font-bold text-center h-full flex justify-center items-center`}>
      {error}
    </p>
  );
};

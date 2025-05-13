// Separate Paginator component
interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Paginator = (props: PaginatorProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={props.onPreviousPage}
        disabled={props.isFirstPage}
        className={`px-1 py-1 rounded-lg  ${
          props.isFirstPage
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-primary hover:brightness-110 hover:cursor-pointer active:brightness-90 active:scale-95 transition-all duration-150 ease-in-out"
        }`}
      >
        <img className={`-scale-100  ${props.isFirstPage ? "opacity-50" : "invert"}`} src="/arrow.svg" alt="Anterior" />
      </button>
      <span className="text-sm font-semibold text-gray-500">
        {props.currentPage + 1} / {props.totalPages}
      </span>
      <button
        onClick={props.onNextPage}
        disabled={props.isLastPage}
        className={`px-1 py-1 rounded-lg ${
          props.isLastPage
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-primary hover:brightness-110 hover:cursor-pointer active:brightness-90 active:scale-95 transition-all duration-150 ease-in-out"
        }`}
      ><img className={props.isLastPage ? "opacity-50" : "invert"} src="/arrow.svg" alt="Siguiente" /></button>
    </div>
  );
};

export default Paginator;

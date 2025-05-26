import StatsContainer from "../molecules/StatsContainer";

const UserStats = () => {
  return (
    <div className="bg-gray-light rounded-2xl pt-3 pb-6 px-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="!text-3xl items-center gap-2">Estadísticas</h2>
        <select
          className="border-2 rounded-xl pr-5 font-bold pl-2 py-1 bg-white focus:outline-none appearance-none"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93bi1pY29uIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==\")",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "98%",
            backgroundPositionY: "5px",
          }}
        >
          <option value="week">Últimos 7 días</option>
          <option value="month" disabled>
            Últimos 30 días
          </option>
        </select>
      </div>

      <StatsContainer />
    </div>
  );
};

export default UserStats;

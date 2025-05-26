import StatItem from "../atoms/StatItem";
import VerticalDivider from "../atoms/VerticalDivider";
import { useUserStats } from "@/lib/hooks/useUserStats";
import { ErrorState, LoadingState } from "../atoms/States";

const StatsContainer = () => {
  const { data, isLoading, isError } = useUserStats();

  return (
    <div className="inline-flex gap-4 pt-4 justify-center w-full">
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState error="Error cargando estadísticas" />
      ) : (
        <>
          <StatItem type="normal" value={data?.totalPickedEggs ?? 0} />
          <VerticalDivider gray />
          <StatItem
            type="broken"
            value={data?.brokenEggsPercentage ?? 0}
            percentage
          />
          <VerticalDivider />
          <StatItem
            type="normal"
            value={data?.averageNotBrokenEggsPickedPerDay ?? 0}
            daily
          />
          <VerticalDivider gray />
          <StatItem
            type="broken"
            value={data?.averageBrokenEggsPickedPerDay ?? 0}
            daily
          />
        </>
      )}
    </div>
  );
};

export default StatsContainer;

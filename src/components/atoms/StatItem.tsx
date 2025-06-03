import eggIcon from "@/assets/icons/egg.svg";
import brokenEggIcon from "@/assets/icons/broken-egg.svg";

const EggIcons = {
  normal: eggIcon,
  broken: brokenEggIcon,
};

enum StatTitle {
  normal = "Recogidos",
  broken = "Rotos",
}

interface StatItemInterface {
  value: number;
  type: "normal" | "broken";
  percentage?: boolean;
  daily?: boolean;
}

const StatItem = (props: StatItemInterface) => {
  return (
    <div className="inline-flex gap-2 justify-center items-center">
      <img className="" src={EggIcons[props.type]} alt="icono" />

      <div>
        <p className="text-3xl font-bold">
          {Math.round(props.value)}
          {props.percentage && (
            <span className="text-xl font-bold text-black/70">%</span>
          )}
          {props.daily && (
            <span className="text-xl font-bold text-black/70">/día</span>
          )}
        </p>
        <p className="text-sm font-semibold leading-2">
          {StatTitle[props.type]}
        </p>
      </div>
    </div>
  );
};
export default StatItem;

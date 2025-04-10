interface CarrousellButtonsProps {
  activeVid: number;
  onClick: (index: number) => void;
}

const CarrousellButtons = ({ activeVid, onClick }: CarrousellButtonsProps) => {
    return (
      <div className="flex items-center gap-4">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className={`size-6 outline-gray-normal/70 backdrop-blur-lg outline-4 rounded-full
              transition-all duration-150 ease-in ${
              i === activeVid ? "bg-primary" : "outline-none bg-gray-normal/70"
            }`}
            onClick={() => onClick(i)}
          />
        ))}
      </div>
    );
  };
  
  export default CarrousellButtons;
  
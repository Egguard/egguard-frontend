interface OpinionImagesProps {
    activeOpinion: number;
  }
  
  const OpinionImages = ({ activeOpinion }: OpinionImagesProps) => {
    const images = [
      "src/assets/images/farmer1.png",
      "src/assets/images/farmer2.png",
      "src/assets/images/farmer3.png",
    ];
  
    const currentImage = images[activeOpinion];
  
    return (
      <img className="size-72 object-cover rounded-2xl" src={currentImage} alt="Foto del granjero" />
    );
  };
  
  export default OpinionImages;
  
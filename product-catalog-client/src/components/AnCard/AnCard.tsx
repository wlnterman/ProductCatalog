import React, { useState } from "react";
import { AnImages } from "./AnDat";
import { LinkFooter } from "./CardElements/RelatedLinks";
import { ImageAndDescription } from "./CardElements/ImageAndDescription";
import { CardStatus } from "./CardElements/CardStatus";
import { CardHeader } from "./CardElements/CardHeader";

// const { Search } = Input;

// interface SearchBarProps {
//   onSearch: (value: string) => void;
// }

//const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
const AnCard: React.FC = () => {
  const [cardBackground, setCardBackground] = useState("#fff");

  const RNG = Math.floor(Math.random() * (AnImages.length - 0) + 0);

  return (
    <div
      style={{
        height: 340,
        textAlign: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,.2)",
        backgroundColor: cardBackground,
        //textDecoration: "underline",
      }}
    >
      {/* 
      justify-content: flex-start; - Align the flex items at the strart\center\end... of the container (horizontal):
      align-content: center; - Pack lines toward the center of the flex container:(vertical)

      align-items: flex-start; - Center... the alignments for all the items of the flexible <div> element: (vertical)
      text-align: justify; - Set the text alignment for different <div> elements:(horizontal)
      */}
      <CardHeader RNG={RNG} />
      <CardStatus cardBackground={cardBackground} setCardBackground={setCardBackground} />
      <ImageAndDescription RNG={RNG} />
      <LinkFooter />
    </div>
  );
};

export default AnCard;

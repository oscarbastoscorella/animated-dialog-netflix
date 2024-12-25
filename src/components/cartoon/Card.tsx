import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ExpandCard } from "./ExpandCard";
import { Cartoon } from "../types/card";

type CardProps = {
  cartoon: Cartoon;
  changeSelectedCard: (cartoon: Cartoon) => void;
  isSelectedCard: boolean;
  isInContainer: boolean;
};

export default function Card({
  cartoon,
  changeSelectedCard,
  isSelectedCard,
  isInContainer,
}: CardProps) {
  const [cardState, setCardState] = useState({
    isOpen: false,
    isHovering: false,
  });

  const handleHoverStart = () =>
    setCardState({ isOpen: true, isHovering: true });

  return (
    <Container>
      <ExpandCard
        isSelectedCard={isSelectedCard}
        changeSelectedCard={changeSelectedCard}
        cartoon={cartoon}
        cardState={cardState}
        setCardState={setCardState}
        isInContainer={isInContainer}
      />
      <Image
        src={`./images/${cartoon.image}`}
        alt={cartoon.name}
        onHoverStart={handleHoverStart}
      />
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  min-width: 225px;
  aspect-ratio: 16/9;
  position: relative;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
`;

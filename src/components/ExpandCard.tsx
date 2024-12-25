import styled from "styled-components";
import { motion } from "framer-motion";
import arrowUp from "./assets/nav-arrow-up.svg";
import useDebounce from "./hooks/useDebounce";
import { useEffect } from "react";
import { Cartoon, SelectedCardState } from "./types/card";
import { hoverCardVariants } from "./constants/variants";

type ExpandCardProps = {
  isSelectedCard: boolean;
  changeSelectedCard: (cartoon: Cartoon) => void;
  cartoon: Cartoon;
  cardState: SelectedCardState;
  setCardState: React.Dispatch<React.SetStateAction<SelectedCardState>>;
  isInContainer: boolean;
};

export function ExpandCard({
  isSelectedCard,
  changeSelectedCard,
  cartoon,
  cardState,
  setCardState,
  isInContainer,
}: ExpandCardProps) {
  const debouncedIsHovering = useDebounce(cardState.isHovering, 300);

  useEffect(() => {
    if (!isInContainer && cardState.isHovering) handleHoverEnd();
  }, [isInContainer]);

  const handleHoverEnd = () =>
    setCardState((prevState) => ({ ...prevState, isHovering: false }));
  const handleClose = () =>
    setCardState((prevState) => ({ ...prevState, isOpen: false }));

  return (
    <HoverContainer
      initial="visible"
      whileHover={debouncedIsHovering ? "expand" : "visible"}
      variants={hoverCardVariants}
      transition={{ duration: 0.35 }}
      zIndex={cardState.isOpen || isSelectedCard ? 1 : 0}
      layoutId={cartoon.id}
      onHoverEnd={handleHoverEnd}
      onAnimationComplete={() => {
        if (!cardState.isHovering && !isSelectedCard) handleClose();
      }}
    >
      {(debouncedIsHovering || isSelectedCard) && (
        <>
          <Image src={`./images/${cartoon.image}`} alt={cartoon.name} />
          <Button
            onClick={() => {
              changeSelectedCard(cartoon);
              handleClose();
            }}
          >
            <Icon src={arrowUp} />
          </Button>
        </>
      )}
    </HoverContainer>
  );
}

const HoverContainer = styled(motion.div)<{ zIndex: number }>`
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.zIndex};
  position: absolute;
`;

const Button = styled.button`
  position: absolute;
  border-radius: 999px;
  height: 35px;
  width: 35px;
  border: 1px solid darkgray;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #232323;
  bottom: 10px;
  right: 20px;
  cursor: pointer;
  &&:hover {
    border: 1px solid white;
  }
`;

const Icon = styled.img`
  width: 100%;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
`;

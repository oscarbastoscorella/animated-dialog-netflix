import styled from "styled-components";
import Card from "./Card";
import { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardState, Cartoon } from "./types/card";
import { cartoons } from "./data/cartoons";
import { cardReducer } from "./reducers/cardReducer";

function App() {
  const [state, dispatch] = useReducer(cardReducer, initialCardState);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const changeSelectedCardHandler = (item: Cartoon) => {
    dispatch({ type: "CHANGE_SELECTED_CARD", payload: item });
  };

  const handleMouseEnterLeave = (isIn: boolean) => {
    dispatch({ type: "HANDLE_MOUSE_ENTER_LEAVE", payload: isIn });
  };

  return (
    <>
      <Container>
        <CarouselContainer
          onMouseEnter={() => handleMouseEnterLeave(true)}
          onMouseLeave={() => handleMouseEnterLeave(false)}
        >
          {cartoons.map((cartoon) => (
            <Card
              key={cartoon.id}
              cartoon={cartoon}
              changeSelectedCard={changeSelectedCardHandler}
              isSelectedCard={state.selectedCard?.id === cartoon.id}
              isInContainer={state.isInContainer}
            />
          ))}
        </CarouselContainer>
      </Container>
      <AnimatePresence>
        {state.openModal && state.selectedCard && (
          <Overlay>
            <Modal
              layoutId={state.selectedCard.id.toString()}
              transition={{ duration: 0.35 }}
            >
              <Button onClick={closeModal}>close</Button>
              <ImageContainer>
                <Image src={"./images/family.webp"} />
                <ImageOverlay />
              </ImageContainer>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

const initialCardState: CardState = {
  selectedCard: undefined,
  openModal: false,
  isInContainer: false,
};

const Container = styled.div`
  height: 100vh;
  color: white;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  width: 75%;
  display: flex;
  gap: 15px;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 2;
  top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(5px);
  background-color: #00000019;
  overflow: hidden;
  padding-top: 30px;
`;

const Modal = styled(motion.div)`
  width: 49%;
  height: 100%;
  background: #181818;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
`;

const Button = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 5;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
`;

const ImageOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #181818, transparent 50%);
  position: absolute;
  top: 0;
  z-index: 3;
`;

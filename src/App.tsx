import styled from "styled-components";
import Card from "./Card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cartoon } from "./types/card";
import { cartoons } from "./data/cartoons";

function App() {
  const [selectedCard, setSelectedCard] = useState<Cartoon | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const [isInContainer, setIsInContainer] = useState(false);

  function closeModal() {
    setOpenModal(false);
    setSelectedCard(undefined);
  }

  function changeSelectedCardHandler(item: Cartoon) {
    setSelectedCard(item);
    setOpenModal(true);
  }

  return (
    <>
      <Container>
        <CarouselContainer
          onMouseEnter={() => setIsInContainer(true)}
          onMouseLeave={() => setIsInContainer(false)}
        >
          {cartoons.map((cartoon) => (
            <Card
              key={cartoon.id}
              cartoon={cartoon}
              changeSelectedCard={changeSelectedCardHandler}
              isSelectedCard={selectedCard?.id === cartoon.id}
              isInContainer={isInContainer}
            />
          ))}
        </CarouselContainer>
      </Container>
      <AnimatePresence>
        {openModal && selectedCard && (
          <Overlay>
            <Modal
              layoutId={selectedCard.id.toString()}
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
  height: fit-content;
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

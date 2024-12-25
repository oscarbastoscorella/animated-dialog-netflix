export type Cartoon = {
  id: string;
  name: string;
  image: string;
};

export type SelectedCardState = {
  isHovering: boolean;
  isOpen: boolean;
};

export type CardState = {
  selectedCard: Cartoon | undefined;
  openModal: boolean;
  isInContainer: boolean;
};

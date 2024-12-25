import { CardState, Cartoon } from "../types/card";

type Action =
  | { type: "CLOSE_MODAL" }
  | { type: "CHANGE_SELECTED_CARD"; payload: Cartoon }
  | { type: "HANDLE_MOUSE_ENTER_LEAVE"; payload: boolean };

export function cardReducer(state: CardState, action: Action): CardState {
  switch (action.type) {
    case "CLOSE_MODAL":
      return { ...state, openModal: false, selectedCard: undefined };
    case "CHANGE_SELECTED_CARD":
      return { ...state, selectedCard: action.payload, openModal: true };
    case "HANDLE_MOUSE_ENTER_LEAVE":
      return { ...state, isInContainer: action.payload };
    default:
      return state;
  }
}

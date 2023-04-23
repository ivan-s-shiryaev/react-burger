import { SHOW_MODAL, HIDE_MODAL, TModalActions } from "../actions/modal";
import { TModalState } from "../../utils";

const initialState: TModalState = false;

const reducer = (state = initialState, action: TModalActions): TModalState => {
  switch (action.type) {
    case SHOW_MODAL: {
      return action.payload;
    }

    case HIDE_MODAL: {
      return false;
    }

    default:
      return state;
  }
};

export default reducer;

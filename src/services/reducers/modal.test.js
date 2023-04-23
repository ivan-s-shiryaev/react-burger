import { SHOW_MODAL, HIDE_MODAL } from "../actions/modal";
import { initialState, modalReducer } from "./modal";

describe("Modal reducer", () => {
  it("Should return the initial state", () => {
    expect(modalReducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle SHOW_MODAL", () => {
    const state = "state";
    expect(
      modalReducer(initialState, { type: SHOW_MODAL, payload: state })
    ).toEqual(state);
  });

  it("Should handle HIDE_MODAL", () => {
    expect(modalReducer(initialState, { type: HIDE_MODAL })).toEqual(
      initialState
    );
  });
});

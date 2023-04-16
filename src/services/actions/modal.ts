import { TModalState } from "../../utils";
export const SHOW_MODAL: "SHOW_MODAL" = "SHOW_MODAL";
export const HIDE_MODAL: "HIDE_MODAL" = "HIDE_MODAL";

export interface IShowModalAction {
  readonly type: typeof SHOW_MODAL;
  readonly payload: TModalState;
}

export interface IHideModalAction {
  readonly type: typeof HIDE_MODAL;
}

export type TModalActions = IShowModalAction | IHideModalAction;

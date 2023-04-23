import { TAuthActions } from "../services/actions/auth";
import {
  TMenuActions,
  TOrderActions,
  TOrderDataActions,
  TwsOrderFeedActions,
  TwsOrderUserActions,
} from "../services/actions/order";
import { TModalActions } from "../services/actions/modal";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import store from "../services/store";

export interface PWithModal {
  modal: string;
}
export type TIngredient = {
  _id: string;
  type: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  count: number;
};
export type TAuthTokenValue = string | undefined;
export type TAuthToken = { token: TAuthTokenValue };
export type TAuthUserData = {
  email: string;
  name: string;
};
export type TAuthUser = {
  data: TAuthUserData;
  request: boolean;
  error: boolean;
};
export type TAuthRegisterData = {
  name: string;
  email: string;
  password: string;
};
export type TAuthRegister = {
  data: TAuthRegisterData;
  request: boolean;
  error: boolean;
};
export type TAuthLoginData = {
  email: string;
  password: string;
};
export type TAuthLogin = {
  data: TAuthLoginData;
  request: boolean;
  error: boolean;
};
export type TAuthLogout = {
  request: boolean;
  error: boolean;
};
export type TAuthForgotData = {
  email: string;
};
export type TAuthForgot = {
  data: {
    email: string;
  };
  request: boolean;
  error: boolean;
};
export type TAuthResetData = {
  password: string;
  token: string;
};
export type TAuthReset = {
  data: TAuthResetData;
  request: boolean;
  error: boolean;
};
export type TAuth = {
  user: TAuthUser;
  register: TAuthRegister;
  login: TAuthLogin;
  logout: TAuthLogout;
  forgot: TAuthForgot;
  reset: TAuthReset;
};
export type TOrderReorder = {
  from: number;
  to: number;
};
export type TOrderItem = { id: string; uuid: string };
export type TOrderTotal = { locked: number; unlocked: number };
export type TOrderItems = {
  locked: Array<TOrderItem>;
  unlocked: Array<TOrderItem>;
};
export type TOrderStatus = { number: number; name: string | null };
export type TOrderState = {
  total: TOrderTotal;
  items: TOrderItems;
  status: TOrderStatus;
  request: boolean;
  error: boolean;
};
export type TOrderEntry = {
  _id: string;
  number: number;
  name: string;
  status: string;
  ingredients: Array<string>;
  createdAt: string;
  updatedAt: string;
};
export type TOrderDataItems = Array<TOrderEntry>;
export type TOrderData = {
  orders: TOrderDataItems;
  total: number;
  totalToday: number;
};
export type TOrderDataState = {
  item: { entry: TOrderEntry | null; request: boolean; error: boolean };
  items: TOrderDataItems;
  total: number;
  totalToday: number;
  success: boolean;
  error: boolean;
};
export type TMenuItem = TIngredient | null;
export type TMenuItems = Array<TIngredient>;
export type TMenuCategory = string;
export type TMenuCategories = Set<string>;
export type TMenuState = {
  item: TMenuItem;
  items: TMenuItems;
  itemsRequest: boolean;
  itemsError: boolean;
  category: TMenuCategory;
  categories: TMenuCategories;
};
export type TModalState = string | boolean;
export type TDnDItem = TOrderItem & {
  type: string;
  price: number;
  index: number;
};
export type TApplicationActions =
  | TAuthActions
  | TMenuActions
  | TOrderActions
  | TOrderDataActions
  | TModalActions;
export type TwsActions = TwsOrderFeedActions | TwsOrderUserActions;
export type RootState = ReturnType<typeof store.getState>;
export type TDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type TThunk = ThunkAction<
  Promise<boolean>,
  RootState,
  unknown,
  TApplicationActions
>;

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
  count: number;
};
export type TAuthUser = {
  data: {
    email: string;
    name: string;
  };
  request: boolean;
  error: boolean;
};
export type TAuthRegister = {
  data: {
    name: string;
    email: string;
    password: string;
  };
  request: boolean;
  error: boolean;
};
export type TAuthLogin = {
  data: {
    email: string;
    password: string;
  };
  request: boolean;
  error: boolean;
};
export type TAuthLogout = {
  request: boolean;
  error: boolean;
};
export type TAuthForgot = {
  data: {
    email: string;
  };
  request: boolean;
  error: boolean;
};
export type TAuthReset = {
  data: {
    password: string;
    token: string;
  };
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
export type TOrderItem = { id: string; uuid: string };
export type TOrderTotal = { locked: number; unlocked: number };
export type TOrderItems = {
  locked: Array<TOrderItem>;
  unlocked: Array<TOrderItem>;
};
export type TOrderStatus = { number: number | number; name: string | null };
export type TOrder = {
  total: TOrderTotal;
  items: TOrderItems;
  status: TOrderStatus;
  statusRequest: boolean;
  statusError: boolean;
};
export type TMenuItem = TIngredient | null;
export type TMenuItems = Array<TIngredient>;
export type TMenuCategory = string;
export type TMenuCategories = Set<string>;
export type TMenu = {
  item: TMenuItem;
  items: TMenuItems;
  itemsRequest: boolean;
  itemsError: boolean;
  category: TMenuCategory;
  categories: TMenuCategories;
};

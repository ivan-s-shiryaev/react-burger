export const BASE_URL_HTTP = "https://norma.nomoreparties.space/api";
export const BASE_URL_WS = "wss://norma.nomoreparties.space";
export const BASE_URL_WS_FEED = `${BASE_URL_WS}/orders/all`;
export const BASE_URL_WS_USER = `${BASE_URL_WS}/orders`;
export enum WS_STATUS_CODE {
  CLOSE_NORMAL = 1000,
}
export enum ORDER_STATUS {
  created = "Создан",
  pending = "Готовится",
  done = "Выполнен",
}

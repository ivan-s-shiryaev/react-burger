import {
  GET_MENU_ITEMS_REQUEST,
  GET_MENU_ITEMS_SUCCESS,
  GET_MENU_ITEMS_ERROR,
  RESET_MENU_ITEMS_COUNT,
  SET_MENU_ITEM,
  SET_MENU_CATEGORY,
  INCREASE_MENU_ITEM_COUNT,
  DECREASE_MENU_ITEM_COUNT,
  GET_ORDER_STATUS_REQUEST,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_ERROR,
  RESET_ORDER_STATUS,
  REORDER_ORDER_ITEMS,
  ADD_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
  TMenuActions,
  TOrderActions,
  SUCCESS_ORDER_FEED,
  ERROR_ORDER_FEED,
  CLOSED_ORDER_FEED,
  MESSAGE_ORDER_FEED,
  TOrderDataActions,
  SUCCESS_ORDER_USER,
  ERROR_ORDER_USER,
  CLOSED_ORDER_USER,
  MESSAGE_ORDER_USER,
  GET_ORDER_ENTRY_REQUEST,
  GET_ORDER_ENTRY_SUCCESS,
  GET_ORDER_ENTRY_ERROR,
} from "../actions/order";
import {
  TMenuItems,
  TMenuState,
  TOrderState,
  TOrderDataState,
} from "../../utils";

const initialStateMenu: TMenuState = {
  item: null,
  items: [],
  itemsRequest: false,
  itemsError: false,
  category: "",
  categories: new Set(),
};
const initialStateOrder: TOrderState = {
  total: {
    locked: 0,
    unlocked: 0,
  },
  items: {
    locked: [],
    unlocked: [],
  },
  status: {
    number: 0,
    name: null,
  },
  request: false,
  error: false,
};
const initialStateOrderData: TOrderDataState = {
  item: { entry: null, request: false, error: false },
  items: [],
  total: 0,
  totalToday: 0,
  success: false,
  error: false,
};

export const menuReducer = (
  state = initialStateMenu,
  action: TMenuActions
): TMenuState => {
  switch (action.type) {
    case GET_MENU_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }

    case GET_MENU_ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
        itemsRequest: false,
        itemsError: false,
        category: action.payload[0].type,
        categories: action.payload.reduce(
          (accumulator, { type }) => accumulator.add(type),
          new Set<string>()
        ),
      };
    }

    case GET_MENU_ITEMS_ERROR: {
      return {
        ...initialStateMenu,
        itemsError: true,
      };
    }

    case RESET_MENU_ITEMS_COUNT: {
      return {
        ...state,
        items: state.items.map((value) => ({ ...value, count: 0 })),
      };
    }

    case SET_MENU_ITEM: {
      const item = state.items.find((value) => value._id === action.payload);

      return {
        ...state,
        item: item === undefined ? null : { ...item },
      };
    }

    case SET_MENU_CATEGORY: {
      const categories = state.categories;
      const category = Array.from(categories).find(
        (value) => value === action.payload
      );

      return {
        ...state,
        category: category === undefined ? "" : category,
      };
    }

    case INCREASE_MENU_ITEM_COUNT: {
      const item = state.items.find((value) => value._id === action.payload.id);
      const items =
        item === undefined
          ? state.items
          : state.items.reduce((accumulator: TMenuItems, value) => {
              accumulator.push({
                ...value,
                count:
                  item.type === "bun"
                    ? value._id === item._id
                      ? 2
                      : value.type === "bun"
                      ? 0
                      : value.count
                    : value._id === item._id
                    ? value.count + 1
                    : value.count,
              });
              return accumulator;
            }, []);
      return {
        ...state,
        items,
      };
    }

    case DECREASE_MENU_ITEM_COUNT: {
      const item = state.items.find((value) => value._id === action.payload.id);
      const items =
        item === undefined
          ? state.items
          : state.items.reduce((accumulator: TMenuItems, value) => {
              accumulator.push({
                ...value,
                count:
                  item.type === "bun"
                    ? value._id === item._id
                      ? 0
                      : value.count
                    : value._id === item._id
                    ? value.count - 1
                    : value.count,
              });
              return accumulator;
            }, []);
      return {
        ...state,
        items,
      };
    }

    default:
      return state;
  }
};

export const orderReducer = (
  state = initialStateOrder,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case GET_ORDER_STATUS_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }

    case GET_ORDER_STATUS_SUCCESS: {
      return {
        ...state,
        status: { ...action.payload },
        total: { ...initialStateOrder.total },
        items: { ...initialStateOrder.items },
        request: false,
        error: false,
      };
    }

    case GET_ORDER_STATUS_ERROR: {
      return {
        ...state,
        error: true,
      };
    }

    case RESET_ORDER_STATUS: {
      return {
        ...state,
        status: { ...initialStateOrder.status },
      };
    }

    case REORDER_ORDER_ITEMS: {
      const items = [...state.items.unlocked];
      const item = items.splice(action.payload.from, 1)[0];

      items.splice(action.payload.to, 0, item);

      return {
        ...state,
        items: {
          ...state.items,
          unlocked: items,
        },
      };
    }

    case ADD_ORDER_ITEM: {
      return action.payload.type === "bun"
        ? {
            ...state,
            total: {
              ...state.total,
              locked: action.payload.price * 2,
            },
            items: {
              ...state.items,
              locked: [{ id: action.payload.id, uuid: action.payload.uuid }],
            },
          }
        : {
            ...state,
            total: {
              ...state.total,
              unlocked: state.total.unlocked + action.payload.price,
            },
            items: {
              ...state.items,
              unlocked: [
                { id: action.payload.id, uuid: action.payload.uuid },
                ...state.items.unlocked,
              ],
            },
          };
    }

    case REMOVE_ORDER_ITEM: {
      return state.items.unlocked[action.payload.index] !== undefined
        ? {
            ...state,
            total: {
              ...state.total,
              unlocked: state.total.unlocked - action.payload.price,
            },
            items: {
              ...state.items,
              unlocked: [
                ...state.items.unlocked.slice(0, action.payload.index),
                ...state.items.unlocked.slice(action.payload.index + 1),
              ],
            },
          }
        : state;
    }

    default:
      return state;
  }
};

export const orderDataReducer = (
  state = initialStateOrderData,
  action: TOrderDataActions
): TOrderDataState => {
  switch (action.type) {
    case SUCCESS_ORDER_FEED:
    case SUCCESS_ORDER_USER: {
      return {
        ...state,
        items: [...initialStateOrderData.items],
        total: initialStateOrderData.total,
        totalToday: initialStateOrderData.totalToday,
        success: true,
        error: initialStateOrderData.error,
      };
    }

    case ERROR_ORDER_FEED:
    case ERROR_ORDER_USER: {
      console.error(action.payload.message);

      return {
        ...state,
        error: true,
      };
    }

    case CLOSED_ORDER_FEED:
    case CLOSED_ORDER_USER: {
      return {
        ...initialStateOrderData,
      };
    }

    case MESSAGE_ORDER_FEED:
    case MESSAGE_ORDER_USER: {
      return {
        ...state,
        items: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: initialStateOrderData.error,
      };
    }

    case GET_ORDER_ENTRY_REQUEST: {
      return {
        ...state,
        item: {
          ...state.item,
          request: true,
        },
      };
    }

    case GET_ORDER_ENTRY_SUCCESS: {
      return {
        ...state,
        item: {
          ...state.item,
          entry: action.payload,
          request: initialStateOrderData.item.request,
          error: initialStateOrderData.item.error,
        },
      };
    }

    case GET_ORDER_ENTRY_ERROR: {
      return {
        ...state,
        item: {
          ...state.item,
          error: true,
        },
      };
    }

    default:
      return state;
  }
};

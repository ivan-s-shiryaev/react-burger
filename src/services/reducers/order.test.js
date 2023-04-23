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
  SUCCESS_ORDER_FEED,
  ERROR_ORDER_FEED,
  CLOSED_ORDER_FEED,
  MESSAGE_ORDER_FEED,
  SUCCESS_ORDER_USER,
  ERROR_ORDER_USER,
  CLOSED_ORDER_USER,
  MESSAGE_ORDER_USER,
  GET_ORDER_ENTRY_REQUEST,
  GET_ORDER_ENTRY_SUCCESS,
  GET_ORDER_ENTRY_ERROR,
} from "../actions/order";
import {
  initialStateMenu,
  initialStateOrder,
  initialStateOrderData,
  menuReducer,
  orderReducer,
  orderDataReducer,
} from "./order";

const menuIngredients = [
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  },
];
const orderItemsUnlocked = [
  {
    id: menuIngredients[0]._id,
    uuid: "3e98bdaf-03de-4113-ada9-41174fbba95e",
  },
];
const orderStatus = {
  name: "Био-марсианский люминесцентный флюоресцентный бургер",
  number: 1225,
};
const orderData = {
  orders: [
    {
      ingredients: [
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093c",
      ],
      _id: "6444fbee45c6f2001be6ccb6",
      name: "Space антарианский краторный бургер",
      status: "done",
      number: 1227,
      createdAt: "2023-04-23T09:35:42.126Z",
      updatedAt: "2023-04-23T09:35:42.164Z",
    },
  ],
  total: 1,
  totalToday: 1,
};
const errorMessage = "Error message";

describe("Menu reducer", () => {
  it("Should return the initial state", () => {
    expect(menuReducer(undefined, {})).toEqual(initialStateMenu);
  });

  it("Should handle GET_MENU_ITEMS_REQUEST", () => {
    expect(
      menuReducer(initialStateMenu, { type: GET_MENU_ITEMS_REQUEST })
    ).toEqual({
      ...initialStateMenu,
      itemsRequest: true,
      itemsError: false,
    });
  });

  it("Should handle GET_MENU_ITEMS_SUCCESS", () => {
    const item = { ...menuIngredients[0] };
    const items = [...menuIngredients];
    const category = item.type;
    const categories = new Set([menuIngredients[0].type]);
    expect(
      menuReducer(initialStateMenu, {
        type: GET_MENU_ITEMS_SUCCESS,
        payload: menuIngredients,
      })
    ).toEqual({
      ...initialStateMenu,
      item: null,
      items,
      itemsRequest: false,
      itemsError: false,
      category,
      categories,
    });
  });

  it("Should handle GET_MENU_ITEMS_ERROR", () => {
    expect(
      menuReducer(initialStateMenu, { type: GET_MENU_ITEMS_ERROR })
    ).toEqual({
      ...initialStateMenu,
      itemsRequest: false,
      itemsError: true,
    });
  });

  it("Should handle RESET_MENU_ITEMS_COUNT", () => {
    const item = { ...menuIngredients[0] };
    const items = [{ ...menuIngredients[0] }];
    expect(
      menuReducer(
        { ...initialStateMenu, items },
        { type: RESET_MENU_ITEMS_COUNT }
      )
    ).toEqual({
      ...initialStateMenu,
      items: [{ ...item, count: 0 }],
    });
  });

  it("Should handle SET_MENU_ITEM", () => {
    const item = { ...menuIngredients[0] };
    const items = [...menuIngredients];
    expect(
      menuReducer(
        { ...initialStateMenu, items },
        {
          type: SET_MENU_ITEM,
          payload: item._id,
        }
      )
    ).toEqual({
      ...initialStateMenu,
      item,
      items,
    });
  });

  it("Should handle SET_MENU_CATEGORY", () => {
    const item = { ...menuIngredients[0] };
    const category = item.type;
    const categories = new Set([menuIngredients[0].type]);

    expect(
      menuReducer(
        { ...initialStateMenu, categories },
        {
          type: SET_MENU_CATEGORY,
          payload: category,
        }
      )
    ).toEqual({
      ...initialStateMenu,
      category,
      categories,
    });
  });

  it("Should handle INCREASE_MENU_ITEM_COUNT", () => {
    const item = { ...menuIngredients[0] };
    const items = [{ ...menuIngredients[0], count: 0 }];

    expect(
      menuReducer(
        { ...initialStateMenu, items },
        {
          type: INCREASE_MENU_ITEM_COUNT,
          payload: { id: item._id },
        }
      )
    ).toEqual({
      ...initialStateMenu,
      items: [{ ...item, count: 1 }],
    });
  });

  it("Should handle DECREASE_MENU_ITEM_COUNT", () => {
    const item = { ...menuIngredients[0] };
    const items = [{ ...menuIngredients[0], count: 1 }];

    expect(
      menuReducer(
        { ...initialStateMenu, items },
        {
          type: DECREASE_MENU_ITEM_COUNT,
          payload: { id: item._id },
        }
      )
    ).toEqual({
      ...initialStateMenu,
      items: [{ ...item, count: 0 }],
    });
  });
});

describe("Order reducer", () => {
  it("Should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialStateOrder);
  });

  it("Should handle GET_ORDER_STATUS_REQUEST", () => {
    expect(
      orderReducer(initialStateOrder, { type: GET_ORDER_STATUS_REQUEST })
    ).toEqual({
      ...initialStateOrder,
      request: true,
      error: false,
    });
  });

  it("Should handle GET_ORDER_STATUS_SUCCESS", () => {
    expect(
      orderReducer(initialStateOrder, {
        type: GET_ORDER_STATUS_SUCCESS,
        payload: orderStatus,
      })
    ).toEqual({
      ...initialStateOrder,
      status: { ...orderStatus },
      request: false,
      error: false,
    });
  });

  it("Should handle GET_ORDER_STATUS_ERROR", () => {
    expect(
      orderReducer(initialStateOrder, { type: GET_ORDER_STATUS_ERROR })
    ).toEqual({
      ...initialStateOrder,
      request: false,
      error: true,
    });
  });

  it("Should handle RESET_ORDER_STATUS", () => {
    expect(
      orderReducer(initialStateOrder, { type: RESET_ORDER_STATUS })
    ).toEqual({
      ...initialStateOrder,
      status: { ...initialStateOrder.status },
    });
  });

  it("Should handle REORDER_ORDER_ITEMS", () => {
    const item1Unlocked = { ...orderItemsUnlocked[0] };
    const item2Unlocked = {
      id: "643d69a5c3f7b9001cfa0941",
      uuid: "7af92b4a-f6e3-4784-bbb3-24c8f2cdcba9",
    };
    const itemsUnlocked = [{ ...item1Unlocked }, { ...item2Unlocked }];
    expect(
      orderReducer(
        {
          ...initialStateOrder,
          items: {
            ...initialStateOrder.items,
            unlocked: [{ ...item1Unlocked }, { ...item2Unlocked }],
          },
        },
        { type: REORDER_ORDER_ITEMS, payload: { from: 0, to: 1 } }
      )
    ).toEqual({
      ...initialStateOrder,
      items: {
        ...initialStateOrder.items,
        unlocked: [{ ...item2Unlocked }, { ...item1Unlocked }],
      },
    });
  });

  it("Should handle ADD_ORDER_ITEM", () => {
    const itemUnlocked = {
      ...orderItemsUnlocked[0],
      price: menuIngredients[0].price,
    };
    expect(
      orderReducer(
        {
          ...initialStateOrder,
        },
        { type: ADD_ORDER_ITEM, payload: itemUnlocked }
      )
    ).toEqual({
      ...initialStateOrder,
      total: {
        ...initialStateOrder.total,
        unlocked: itemUnlocked.price,
      },
      items: {
        ...initialStateOrder.items,
        unlocked: [...orderItemsUnlocked],
      },
    });
  });

  it("Should handle REMOVE_ORDER_ITEM", () => {
    const itemUnlocked = {
      ...orderItemsUnlocked[0],
      price: menuIngredients[0].price,
      index: 0,
    };
    expect(
      orderReducer(
        {
          ...initialStateOrder,
          total: {
            ...initialStateOrder.total,
            unlocked: itemUnlocked.price,
          },
          items: {
            ...initialStateOrder.items,
            unlocked: [...orderItemsUnlocked],
          },
        },
        { type: REMOVE_ORDER_ITEM, payload: itemUnlocked }
      )
    ).toEqual({
      ...initialStateOrder,
    });
  });
});

describe("Order Data reducer", () => {
  it("Should return the initial state", () => {
    expect(orderDataReducer(undefined, {})).toEqual(initialStateOrderData);
  });

  it("Should handle SUCCESS_ORDER_FEED", () => {
    expect(
      orderDataReducer(initialStateOrderData, {
        type: SUCCESS_ORDER_FEED,
      })
    ).toEqual({
      ...initialStateOrderData,
      success: true,
      error: false,
    });
  });

  it("Should handle SUCCESS_ORDER_USER", () => {
    expect(
      orderDataReducer(initialStateOrderData, {
        type: SUCCESS_ORDER_USER,
      })
    ).toEqual({
      ...initialStateOrderData,
      success: true,
      error: false,
    });
  });

  it("Should handle ERROR_ORDER_FEED", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      orderDataReducer(initialStateOrderData, {
        type: ERROR_ORDER_FEED,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialStateOrderData,
      error: true,
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle ERROR_ORDER_USER", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      orderDataReducer(initialStateOrderData, {
        type: ERROR_ORDER_USER,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialStateOrderData,
      error: true,
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle CLOSED_ORDER_FEED", () => {
    expect(
      orderDataReducer(initialStateOrderData, {
        type: CLOSED_ORDER_FEED,
      })
    ).toEqual({
      ...initialStateOrderData,
    });
  });

  it("Should handle CLOSED_ORDER_USER", () => {
    expect(
      orderDataReducer(initialStateOrderData, {
        type: CLOSED_ORDER_USER,
      })
    ).toEqual({
      ...initialStateOrderData,
    });
  });

  it("Should handle MESSAGE_ORDER_FEED", () => {
    const items = [...orderData.orders];
    const total = orderData.total;
    const totalToday = orderData.totalToday;
    expect(
      orderDataReducer(initialStateOrderData, {
        type: MESSAGE_ORDER_FEED,
        payload: { ...orderData },
      })
    ).toEqual({
      ...initialStateOrderData,
      items,
      total,
      totalToday,
    });
  });

  it("Should handle MESSAGE_ORDER_USER", () => {
    const items = [...orderData.orders];
    const total = orderData.total;
    const totalToday = orderData.totalToday;
    expect(
      orderDataReducer(initialStateOrderData, {
        type: MESSAGE_ORDER_USER,
        payload: { ...orderData },
      })
    ).toEqual({
      ...initialStateOrderData,
      items,
      total,
      totalToday,
    });
  });

  it("Should handle GET_ORDER_ENTRY_REQUEST", () => {
    expect(
      orderDataReducer(initialStateOrderData, {
        type: GET_ORDER_ENTRY_REQUEST,
      })
    ).toEqual({
      ...initialStateOrderData,
      item: { ...initialStateOrderData.item, request: true, error: false },
    });
  });

  it("Should handle GET_ORDER_ENTRY_SUCCESS", () => {
    const entry = { ...orderData.orders[0] };
    expect(
      orderDataReducer(initialStateOrderData, {
        type: GET_ORDER_ENTRY_SUCCESS,
        payload: { ...entry },
      })
    ).toEqual({
      ...initialStateOrderData,
      item: {
        ...initialStateOrderData.item,
        entry,
        request: false,
        error: false,
      },
    });
  });

  it("Should handle GET_ORDER_ENTRY_ERROR", () => {
    expect(
      orderDataReducer(initialStateOrderData, {
        type: GET_ORDER_ENTRY_ERROR,
      })
    ).toEqual({
      ...initialStateOrderData,
      item: { ...initialStateOrderData.item, request: false, error: true },
    });
  });
});

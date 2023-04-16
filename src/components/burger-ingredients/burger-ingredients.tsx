import {
  FC,
  useCallback,
  useRef,
  createRef,
  useMemo,
  RefObject,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "../../hooks/redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { PWithModal, TMenuState, getMenuCategoryTitle } from "../../utils";
import { SET_MENU_ITEM, SET_MENU_CATEGORY } from "../../services/actions/order";
import { HIDE_MODAL } from "../../services/actions/modal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import burgerIngredientsStyles from "./burger-ingredients.module.css";

type TState = {
  menu: TMenuState;
};

const BurgerIngredients: FC<PWithModal> = (props) => {
  const dispatch = useDispatch();

  const { item, category, categories } = useSelector(
    (state: TState): TMenuState => state.menu
  );

  const categoryRefs = useMemo(
    (): Map<string, RefObject<HTMLHeadingElement>> =>
      Array.from(categories).reduce(
        (accumulator, value) => accumulator.set(value, createRef()),
        new Map()
      ),
    [categories]
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMenuScroll = useCallback(() => {
    const ref = categoryRefs.get(category);
    const origin = containerRef.current?.getBoundingClientRect().top;
    const active = ref?.current?.getBoundingClientRect().top;
    const offset =
      ref === undefined || origin === undefined || active === undefined
        ? Infinity
        : Math.abs(origin - active);
    const current =
      origin === undefined
        ? category
        : Array.from(categoryRefs).reduce((accumulator, [key, value]) => {
            const temp = value.current?.getBoundingClientRect().top;
            return temp === undefined
              ? accumulator
              : Math.abs(origin - temp) < offset
              ? key
              : accumulator;
          }, category);
    if (current !== category)
      dispatch({
        type: SET_MENU_CATEGORY,
        payload: current,
      });
  }, [category, dispatch, containerRef, categoryRefs]);

  const handleMenuItemModalClose = useCallback(() => {
    dispatch({ type: HIDE_MODAL });

    dispatch({
      type: SET_MENU_ITEM,
      payload: null,
    });
  }, [dispatch]);

  return (
    <Fragment>
      <nav className={`${burgerIngredientsStyles.menu}`}>
        {Array.from(categories).map((value) => {
          return (
            <Tab
              value={value}
              active={value === category}
              onClick={() => {
                return;
              }}
              key={`menu_tab__${value}`}
            >
              {getMenuCategoryTitle(value)}
            </Tab>
          );
        })}
      </nav>
      {
        <div
          ref={containerRef}
          onScroll={handleMenuScroll}
          className={`${burgerIngredientsStyles.container}`}
        >
          {Array.from(categories).map((value) => (
            <Fragment key={`menu_category__${value}`}>
              <IngredientsCategory
                ref={categoryRefs.get(value) || null}
                id={value}
              />
            </Fragment>
          ))}
        </div>
      }
      {props.modal === "menu" && item && (
        <Modal
          header="Детали ингредиента"
          handleClose={handleMenuItemModalClose}
        >
          <IngredientDetails />
        </Modal>
      )}
    </Fragment>
  );
};

export default BurgerIngredients;

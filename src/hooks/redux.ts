import {
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
  TypedUseSelectorHook,
} from "react-redux";
import { TDispatch } from "../utils";
import { RootState } from "../utils";

export const useDispatch = () => useDispatchRedux<TDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;

import api from "@/api";
import errorHandler from "@/helpers/errorHendler";
import type { ICard } from "@/interfaces";
import { createContext, useEffect, useReducer, type ActionDispatch, type PropsWithChildren } from "react";

type Actions = [
  | { type: "add"; payload: ICard }
  | { type: "update"; payload: Partial<ICard> & Pick<ICard, "_id"> }
  | { type: "set"; payload: ICard[] }
  | { type: "delete"; payload: ICard["_id"] }
];

export const CardContext = createContext<ICard[]>([]);
export const CardDispatchContext = createContext<ActionDispatch<Actions>>(() => {});

export default function CardContextProvider({ children }: PropsWithChildren) {
  const [cards, dispatch] = useReducer<ICard[], Actions>((state, action) => {
    if (action.type === "set") return action.payload;
    if (action.type === "add") return [...state, action.payload];
    if (action.type === "delete") return state.filter((card) => card._id !== action.payload);
    if (action.type === "update")
      return state.map((el) => (el._id === action.payload._id ? { ...el, ...action.payload } : el));

    errorHandler.addAction(`useCards: Action type is not valide. action: ${action}`);

    return state;
  }, []);

  useEffect(() => {
    api.getCards().then(({ data }) => {
      dispatch({ type: "set", payload: data });
    });
  }, []);

  return (
    <div>
      <CardContext value={cards}>
        <CardDispatchContext value={dispatch}>{children}</CardDispatchContext>
      </CardContext>
    </div>
  );
}

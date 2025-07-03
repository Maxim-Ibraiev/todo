import { CardContext, CardDispatchContext } from "@/contexts/CardContextProvider";
import errorHandler from "@/helpers/errorHendler";
import type { FilterOptions, ICard } from "@/interfaces";
import { useContext } from "react";

export default function useCards() {
  const cards = useContext(CardContext);
  const dispatch = useContext(CardDispatchContext);

  const getFilteredCards = (fillterBy: FilterOptions, cardsToFilter: ICard[]) => {
    if (fillterBy === "all") return cardsToFilter;
    if (fillterBy === "checked") return cardsToFilter.filter((el) => el.checked);
    if (fillterBy === "unchecked") return cardsToFilter.filter((el) => !el.checked);

    errorHandler.addAction(`getFilteredCards: fillterBy is not valide. fillterBy: ${fillterBy}`);

    return cardsToFilter;
  };

  return { cards, dispatch, getFilteredCards };
}

import useCards from "@/hooks/useCards";
import type { FilterOptions } from "@/interfaces";
import { useState } from "react";
import Card from "../Card/Card";
import Filter from "../Filter";

export default function CardList() {
  const { cards, getFilteredCards } = useCards();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>("all");
  const filteredCards = getFilteredCards(filterOptions, cards);

  return (
    <div>
      <Filter onChange={setFilterOptions} />

      <div className="flex flex-wrap gap-3 m-3 ">
        {filteredCards.map((card) => (
          <Card key={card._id} card={card}></Card>
        ))}
      </div>
    </div>
  );
}

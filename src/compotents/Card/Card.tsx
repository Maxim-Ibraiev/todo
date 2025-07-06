import api from "@/api";
import errorHandler from "@/helpers/errorHendler";
import useCards from "@/hooks/useCards";
import type { ICard } from "@/interfaces.js";
import Image from "next/image";
import { useState, type FocusEventHandler } from "react";
import Input from "../Input";
import Paper from "../Paper";
import Textarea from "../Textarea";

interface IProms {
  card: ICard;
}

export default function Card({ card }: IProms) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const { dispatch } = useCards();

  const handleDeleteItem = async () => {
    try {
      await api.deleteCard(card._id);
      dispatch({ type: "delete", payload: card._id });
    } catch (error) {
      errorHandler.axiosError("The card was not deleted due to a server error", error);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement & HTMLTextAreaElement> = async (e) => {
    const { name, value } = e.target;
    const currentCard = {
      title,
      description,
      _id: card._id,
    };

    if (value !== card[name as keyof ICard]) {
      try {
        await api.updateCard(currentCard);
        dispatch({ type: "update", payload: currentCard });
      } catch (error) {
        setTitle(card.title);
        setDescription(card.description);

        errorHandler.axiosError("The card was not updated due to a server error", error);
      }
    }
  };

  const handleCheck = async () => {
    const cardToUpdate = { checked: !card.checked, _id: card._id };

    try {
      // dispatch first to increase reaction time
      dispatch({ type: "update", payload: cardToUpdate });
      await api.updateCard(cardToUpdate);
    } catch (error) {
      errorHandler.axiosError("The card was not updated due to a server error", error);
    }
  };

  return (
    <Paper>
      <div className="flex justify-between ">
        <button onClick={handleCheck}>
          {card.checked ? (
            <Image width={20} height={20} src="/checked.svg" alt="checked" />
          ) : (
            <Image width={20} height={20} src="/unchecked.svg" alt="unchecked" />
          )}
        </button>
        <button onClick={handleDeleteItem}>
          <Image width={20} height={20} src="/cross.svg" alt="cross" />
        </button>
      </div>

      <div className="flex flex-col">
        <Input
          className="text-2xl border-b text-center"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
        />
        <Textarea
          className="m-3 p-1 "
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </Paper>
  );
}

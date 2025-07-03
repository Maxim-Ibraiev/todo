import {} from "mongoose";

import type { ICard, ICardToCreate } from "@/interfaces";
import connectToDatabase from "../connectToDb";
import CardsSchema from "./cardSchema";

const CardModel = global.CardModel;
export default CardModel;

export const getCardsFromDB = async () => {
  await connectToDatabase();

  const cards = await CardsSchema.find();
  return cards.map((card) => ({
    ...card.toObject(),
    _id: card._id.toString(),
  }));
};

export const createCardAtDB = async (body: ICardToCreate) => {
  await connectToDatabase();

  const newCard = new CardsSchema(body);
  const card = await newCard.save();

  return {
    ...card.toObject(),
    _id: card._id.toString(),
  };
};

export const updateCardAtDB = async (body: ICard) => {
  await connectToDatabase();

  const cartToUpdate = { ...body, _id: undefined };
  const updatedCard = await CardsSchema.findByIdAndUpdate(body._id, cartToUpdate, { new: true });

  return updatedCard
    ? {
        ...updatedCard.toObject(),
        _id: updatedCard._id.toString(),
      }
    : null;
};

export const deleteCardfromDB = async (id: ICard["_id"]) => {
  await connectToDatabase();

  const card = await CardsSchema.findOneAndDelete({ _id: id });

  return card
    ? {
        ...card.toObject(),
        _id: card._id.toString(),
      }
    : card;
};

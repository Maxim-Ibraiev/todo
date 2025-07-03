import Responser from "../Responser";
import { createCardAtDB, deleteCardfromDB, getCardsFromDB, updateCardAtDB } from "./cardModels";
import cardSchema from "./cardSchema";

export async function GET() {
  const allCards = await getCardsFromDB();

  return Responser.ok(allCards);
}

export async function POST(request: Request) {
  const { body } = await request.json();

  // validation
  try {
    await cardSchema.validate(body);
  } catch (error) {
    return Responser.badRequest(error);
  }

  // create
  const newCard = await createCardAtDB(body);

  return Responser.ok(newCard);
}

export async function PATCH(request: Request) {
  const { body } = await request.json();

  // validation
  try {
    await cardSchema.validate(body, Object.keys(body));
  } catch (error) {
    return Responser.badRequest(error);
  }

  // update
  const newCard = await updateCardAtDB(body);

  return newCard ? Responser.ok(newCard) : Responser.notFound(newCard);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  // validation
  try {
    await cardSchema.validate({ _id: id }, { pathsToSkip: ["title", "description", "checked"] });
  } catch (error) {
    return Responser.badRequest(error);
  }

  // delete
  const deleteCard = await deleteCardfromDB(id);

  return deleteCard ? Responser.ok(deleteCard) : Responser.notFound(deleteCard);
}

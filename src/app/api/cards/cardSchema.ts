import type { ICard } from "@/interfaces";
import { Schema, model, type Model } from "mongoose";

type CartSchema = Omit<ICard, "_id">;

const cardsSchema = new Schema<CartSchema>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 1,
      maxlength: [999, "Too long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 1,
      maxlength: [999, "Too long"],
    },
    checked: {
      type: Boolean,
      required: [true, "checked is required"],
    },
  },
  {
    bufferTimeoutMS: 300000,
    versionKey: false,
  }
);

declare global {
  var CardModel: Model<CartSchema> | undefined;
}

if (!global.CardModel) {
  global.CardModel = model<CartSchema>("todos", cardsSchema);
}

const CardModel = global.CardModel;
export default CardModel;

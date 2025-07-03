export interface ICard {
  _id: string;
  title: string;
  description: string;
  checked: boolean;
}
export type ICardToCreate = Omit<ICard, "_id">;

export type FetchRequest = "Error" | "Request" | "Success" | undefined | null;
export type FilterOptions = "all" | "checked" | "unchecked";

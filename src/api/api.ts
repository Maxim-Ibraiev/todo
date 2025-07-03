import type { BackendResponse } from "@/app/api/Responser";
import { ICardToCreate, type ICard } from "@/interfaces";
import axios from "axios";

const URL = "/api/cards";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH",
};

const api = {
  getCards: (): Promise<BackendResponse<ICard[]>> => {
    return axios.get(URL, { headers }).then((r) => r.data);
  },

  setCard: async (body: ICardToCreate): Promise<BackendResponse<ICard>> => {
    return axios.post(URL, { headers, body }).then((r) => r.data);
  },
  updateCard: async (body: Partial<ICard> & Pick<ICard, "_id">): Promise<BackendResponse<ICard>> => {
    return axios.patch(URL, { headers, body }).then((r) => r.data);
  },

  deleteCard: async (id: ICard["_id"]): Promise<BackendResponse<ICard>> => {
    return axios.delete(URL, { headers, data: { id } }).then((r) => r.data);
  },
};

export default api;

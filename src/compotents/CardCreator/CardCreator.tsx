"use client";
import errorHandler from "@/helpers/errorHendler";
import useCards from "@/hooks/useCards";
import { useState, type FormEventHandler } from "react";
import api from "../../api";
import { FetchRequest } from "../../interfaces";
import Input from "../Input";
import Paper from "../Paper";
import Textarea from "../Textarea";

export default function CardCreator() {
  const [title, setTitle] = useState("");
  const [description, setDescripcion] = useState("");
  const [buttonState, setButtonState] = useState<FetchRequest>();
  const { dispatch } = useCards();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setButtonState("Request");
      const newCard = { title, description, checked: false };
      const response = await api.setCard(newCard);

      dispatch({ type: "add", payload: response.data });
      setButtonState("Success");
    } catch (error) {
      setButtonState("Error");
      errorHandler.axiosError("The card was not created due to a server error.", error);
    }
  };

  return (
    <Paper className="w-[300px] mt-3 mx-auto">
      <form className="flex flex-col gap-2 w-[300px]" onSubmit={handleSubmit}>
        <Input className="border" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          className="outline p-1"
          value={description}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <button className="border border-gray-500 " type="submit" disabled={buttonState === "Request"}>
          {!buttonState && "submit"}
          {buttonState === "Success" && "submit"}
          {buttonState === "Request" && "loading..."}
          {buttonState === "Error" && "Error"}
        </button>
      </form>
    </Paper>
  );
}

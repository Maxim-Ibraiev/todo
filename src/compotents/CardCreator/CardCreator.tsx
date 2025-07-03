"use client";
import useCards from "@/hooks/useCards";
import { useState, type FormEventHandler } from "react";
import api from "../../api";
import { FetchRequest } from "../../interfaces";
import Input from "../Input";
import Paper from "../Paper";

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
    } catch {
      setButtonState("Error");
    }
  };

  return (
    <Paper className="w-[300px] mt-3 mx-auto">
      <form className="flex flex-col gap-2 w-[300px]" onSubmit={handleSubmit}>
        <Input value={title} handleChange={setTitle} required />
        <Input value={description} handleChange={setDescripcion} required />

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

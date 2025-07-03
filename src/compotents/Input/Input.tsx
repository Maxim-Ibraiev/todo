import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface IProms extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value: string;
  handleChange: (value: string) => void;
}

export default function Input({ value, handleChange, ...proms }: IProms) {
  return (
    <input
      className="border-1 border-gray-500 rounded-md  focus:border-indigo-600  outline-0"
      {...proms}
      value={value}
      minLength={1}
      maxLength={999}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
}

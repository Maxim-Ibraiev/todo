import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input({
  value,
  className,
  ...proms
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className={` border-gray-500 rounded-md  focus:border-indigo-600   ${className}`}
      value={value}
      minLength={1}
      maxLength={999}
      {...proms}
    />
  );
}

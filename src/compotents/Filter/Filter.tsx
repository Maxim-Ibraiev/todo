import type { FilterOptions } from "@/interfaces";
import { useState, type ChangeEventHandler } from "react";

const options: FilterOptions[] = ["all", "checked", "unchecked"];

interface IProps {
  onChange: (option: FilterOptions) => void;
}

export default function Filter({ onChange }: IProps) {
  const [selectedOprion, setSelectedOprion] = useState<FilterOptions>("all");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedOprion(e.target.name as FilterOptions);
    onChange(e.target.name as FilterOptions);
  };

  return (
    <fieldset className="flex justify-center gap-10 my-3">
      {options.map((option) => (
        <label key={option}>
          <span className="pr-2 ">{option}</span>
          <input type="radio" name={option} checked={selectedOprion === option} onChange={handleChange} />
        </label>
      ))}
    </fieldset>
  );
}

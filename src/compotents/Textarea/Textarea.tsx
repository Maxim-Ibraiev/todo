import {
  useEffect,
  useRef,
  type ChangeEventHandler,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
} from "react";

export default function Textarea({
  value,
  className,
  onChange,
  ...proms
}: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    adjustHeight();

    if (onChange) onChange(e);
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      className={` border-gray-500 rounded-md  focus:border-indigo-600 focus:outline-indigo-600  resize-none ${className}`}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      rows={1}
      minLength={1}
      maxLength={999}
      {...proms}
    />
  );
}

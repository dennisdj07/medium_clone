import type { ChangeEvent } from "react";

interface labeledInputType {
  label: string;
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({
  label,
  type,
  placeholder,
  onChange,
}: labeledInputType) => {
  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm textblack font-semibold">
        {label}
      </label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default LabeledInput;

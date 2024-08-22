import { forwardRef } from "react";

export interface PropsSchema {
  heading: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = forwardRef<HTMLInputElement, PropsSchema>((props, ref) => {
  const { heading, placeholder, onChange } = props;
  return (
    <div className="h-auto w-full flex justify-center items-center py-2">
      <div className="w-[95%] h-full flex flex-col justify-center">
        <div className="text-black font-semibold text-base sm:text-lg lg:text-xl lg:mb-1">
          {heading}
        </div>
        <input
          type="text"
          className="border border-gray-500 rounded-md px-2 w-full h-10 sm:h-12 text-gray-600"
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
        />
      </div>
    </div>
  );
});

export default InputBox;

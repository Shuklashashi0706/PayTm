import { forwardRef } from "react";

export interface PropsSchema {
  heading: string;
  placeholder: string;
}

const InputBox = forwardRef<HTMLInputElement, PropsSchema>((props, ref) => {
  const { heading, placeholder } = props;
  return (
    <div className="h-[15%] w-full flex justify-center items-center">
      <div className="w-[90%] h-full flex flex-col justify-center">
        <div className="text-black font-semibold lg:text-[1.5rem] lg:mb-1">
          {heading}
        </div>
        <input
          type="text"
          className="border border-gray-500 rounded-md px-2 w-full h-[40%] text-gray-500"
          placeholder={placeholder}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default InputBox;

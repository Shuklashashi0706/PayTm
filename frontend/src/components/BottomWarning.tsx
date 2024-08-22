import { Link } from "react-router-dom";

export interface propsSchema {
  text1: string;
  text2: string;
  link: string;
}

const BottomWarning = (props: propsSchema) => {
  const { text1, text2, link } = props;
  return (
    <div className="h-auto w-full flex justify-center items-center py-2">
      <div className="font-semibold text-gray-500 text-sm sm:text-base lg:text-lg text-center lg:w-[85%]">
        {text1}{" "}
        <Link to={link}>
          <span className="underline cursor-pointer text-blue-600">{text2}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomWarning;

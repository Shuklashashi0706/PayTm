import { Link } from "react-router-dom";

export interface propsSchema {
  text1: string;
  text2: string;
  link: string;
}
const BottomWarning = (props: propsSchema) => {
  const { text1, text2, link } = props;
  return (
    <div className="  h-[6%] w-full flex  justify-center items-center ">
      <div className=" font-semibold text-gray-500 text-1xl text-center lg:w-[85%]  lg:text-[1.3rem] ">
        {text1}
        <Link to={link}>
          <span className="underline cursor-pointer">{text2}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomWarning;

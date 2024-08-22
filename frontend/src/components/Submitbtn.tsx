export interface propsSchema {
  text: string;
}
const SubmitBtn = (props: propsSchema) => {
  const { text } = props;
  return (
    <div className=" h-[9%] w-full flex justify-center items-center ">
      <div className=" bg-black w-[80%] h-[80%] rounded-lg flex items-center justify-center cursor-pointer hover:scale-105">
        <div className=" font-bold text-1xl lg:text-2xl text-white ">{text}</div>
      </div>
    </div>
  );
};

export default SubmitBtn;

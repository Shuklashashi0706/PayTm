export interface propsSchema {
  text: string;
}
const Heading = (props: propsSchema) => {
  const { text } = props;
  return (
    <div className="h-[15%] w-full flex justify-center items-center ">
      <div className=" font-bold text-4xl lg:text-5xl ">{text}</div>
    </div>
  );
};

export default Heading;

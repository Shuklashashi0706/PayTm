export interface propsSchema {
  text: string;
}

const Heading = (props: propsSchema) => {
  const { text } = props;
  return (
    <div className="h-[10%] w-full flex justify-center items-center p-2">
      <div className="font-bold text-3xl sm:text-4xl lg:text-5xl text-center">{text}</div>
    </div>
  );
};

export default Heading;

export interface propsSchema {
  text: string;
}

const SubHeading = (props: propsSchema) => {
  const { text } = props;
  return (
    <div className="h-[8%] w-full flex justify-center items-center p-2">
      <div className="font-semibold text-gray-500 text-sm sm:text-base text-center lg:w-[85%] lg:text-lg">
        {text}
      </div>
    </div>
  );
};

export default SubHeading;

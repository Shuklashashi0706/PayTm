export interface propsSchema {
    text: string;
  }
  const SubHeading = (props: propsSchema) => {
    const { text } = props;
    return (
      <div className=" h-[10%] w-full flex justify-center items-center ">
        <div className=" font-semibold text-gray-500 text-1xl text-center lg:w-[85%]  lg:text-2xl ">{text}</div>
      </div>
    );
  };
  
  export default SubHeading;
  
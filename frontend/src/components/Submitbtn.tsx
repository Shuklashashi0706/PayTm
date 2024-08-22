export interface propsSchema {
  text: string;
  onClick:()=>void
}

const SubmitBtn = (props: propsSchema) => {
  const { text,onClick } = props;
  return (
    <div className="h-[8%] w-full flex justify-center items-center py-2">
      <button onClick={onClick} className="bg-black w-[90%] sm:w-[80%] h-12 sm:h-14 rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-300">
        <span className="font-bold text-lg sm:text-xl lg:text-2xl text-white">
          {text}
        </span>
      </button>
    </div>
  );
};

export default SubmitBtn;

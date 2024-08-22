interface userProp {
  userName: string;
}
const Appbar = (prop:userProp) => {
  const {userName} = prop;
  return (
    <div className="shadow h-14 flex justify-between">
      <div className=" font-semibold flex flex-col justify-center h-full ml-4">
        PayTM App
      </div>
      <div className="flex">
        <div className=" font-semibold flex flex-col justify-center h-full mr-4">
          Hello
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">{userName[0]}</div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;

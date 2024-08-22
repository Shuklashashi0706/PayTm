import { useEffect, useRef } from "react";

const SendMoney = () => {
  const InputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  }, []);
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="border border-gray-300 text-gray-900 max-w-md p-6 space-y-8 w-full sm:w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              Send Money
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">A</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold">
                Friend's Name
              </h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="amount">
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  id="amount"
                  ref={InputRef}
                  placeholder="Enter amount"
                />
              </div>
              <button className="justify-center rounded-md text-sm font-medium transition-colors h-10 w-full bg-green-500 hover:bg-green-600 text-white">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;

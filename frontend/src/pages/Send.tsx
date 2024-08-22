import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { toast, ToastContainer } from "react-toastify";

interface Params {
  id: string;
}

const SendMoney: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { id: recieverId } = useParams<Params>();
  const senderId = useSelector((state: RootState) => state.user._id);
  
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/account/transfer?id=${recieverId}`,
        {
          senderId,
          amount: input,
        },
        {withCredentials:true}
      );

      if (response.status === 200) {
        toast.success("Transfer Successful");
      }
    } catch (error) {
      toast.error("Transfer failed");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
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
                  ref={inputRef}
                  placeholder="Enter amount"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button
                onClick={handleTransfer}
                className="justify-center rounded-md text-sm font-medium transition-colors h-10 w-full bg-green-500 hover:bg-green-600 text-white"
              >
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
